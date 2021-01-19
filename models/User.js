const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	firstName: {
		type: String,
		required: true,
		trim: true
	},
	lastName: {
		type: String,
		trim: true
	},
	password: {
		type: String,
		required: true
	}
})

userSchema.pre('save', async function (next) {
	try {
		this.password = await bcrypt.hash(this.password, 10)
		next()
	} catch (err) {
		next(err)
	}
})

userSchema.methods.comparePassword = function (other) {
	return bcrypt.compare(other, this.password)
}

module.exports = mongoose.model('User', userSchema)