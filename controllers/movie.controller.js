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

module.exports = {
	get,
	getAll
}