const firebase = require('firebase-admin')

const Movie = require('../models/Movie')

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

// FIXME: Could not proxy request HPE_INVALID_CONSTANT
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
	streamMovie
}