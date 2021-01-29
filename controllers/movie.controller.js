const firebase = require('firebase-admin')

const Movie = require('../models/Movie')
const Rating = require('../models/Rating')

const get = async (req, res) => {
	try {
		const movie = await Movie.findById(req.params.id)
		res.send({ movie })
	} catch (err) {
		res.sendStatus(500)
	}
}

const getAll = async (req, res) => {
	try {
		const movies = await Movie.find({})
		res.send({ movies })
	} catch (err) {
		res.sendStatus(500)
	}
}

const rateMovie = async (req, res) => {
	try {
		const ratedBefore = await Rating.find({
			userId: req.user.id,
			movieId: req.params.id
		})

		// Has rated before, so edit rating
		if (ratedBefore.length !== 0) {
			const rating = ratedBefore[0]

			const oldRating = rating.rating
			rating.rating = req.body.rating
			await rating.save()

			const movie = await Movie.findById(req.params.id)

			if (!movie) {
				res.sendStatus(400)
				return
			}

			movie.rateValue -= oldRating
			movie.rateValue += req.body.rating

			await movie.save()
			res.sendStatus(200)
		} else {
			const rating = new Rating({
				userId: req.user.id,
				movieId: req.params.id,
				rating: req.body.rating
			})

			const movie = await Movie.findById(req.params.id)

			if (!movie) {
				res.sendStatus(400)
				return
			}

			await Movie.findByIdAndUpdate(req.params.id, {
				$inc: {
					'rateCount': 1,
					'rateValue': req.body.rating
				}
			})

			await rating.save()
			res.sendStatus(201)
		}
	} catch (err) {
		console.log(err)
		res.sendStatus(500)
	}
}

const getMovieRating = async (req, res) => {
	try {
		const rating = await Rating.findOne({
			userId: req.user.id,
			movieId: req.params.id
		})

		res.json(rating)
	} catch (err) {
		console.log(err)
		res.sendStatus(500)
	}
}

const streamMovie = async (req, res) => {
	const range = req.headers.range
	const bucket = firebase.storage().bucket()

	const movie = await Movie.findById(req.params.id)

	// Get video size
	const videoFile = bucket.file(movie.videoFileUrl)
	const [metadata] = await videoFile.getMetadata()
	const videoSize = metadata.size

	if (range) {
		// Parse range
		const parts = range.replace('bytes=', '').split('-')
		const start = parseInt(parts[0], 10)
		const end = parts[1] ? parseInt(parts[1], 10) : videoSize - 1

		res.writeHead(206, {
			'Content-Range': `bytes ${start}-${end}/${videoSize}`,
			'Accept-Ranges': 'bytes',
			'Content-Length': end - start + 1,
			'Content-Type': 'video/mp4',
		})

		videoFile.createReadStream({ start, end }).pipe(res)
	} else {
		res.writeHead(200, {
			'Content-Length': videoSize,
			'Content-Type': 'video/mp4'
		})

		videoFile.createReadStream().pipe(res)
	}
}

module.exports = {
	get,
	getAll,
	rateMovie,
	getMovieRating,
	streamMovie
}