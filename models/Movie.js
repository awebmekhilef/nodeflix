const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	description: {
		type: String,
		trim: true
	},
	coverImageUrl: {
		type: String
	}
})

module.exports = mongoose.model('Movie', movieSchema)