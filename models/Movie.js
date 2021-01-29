const mongoose = require('mongoose')

const Rating = require('./Rating')

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
	},
	videoFileUrl: {
		type: String
	},
	rateCount: {
		type: Number,
		default: 0
	},
	rateValue: {
		type: Number,
		default: 0
	}
})

movieSchema.pre('findOneAndRemove', async function (next) {
	try {
		await Rating.deleteMany({ movieId: this.getQuery()._id })
		next()
	} catch (err) {
		next(err)
	}
})

module.exports = mongoose.model('Movie', movieSchema)