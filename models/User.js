const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const validateEmail = function (email) {
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
	return re.test(email)
};

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		validate: validateEmail,
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
	hashedPassword: {
		type: String,
		minlength: 6,
		required: true
	}
})

userSchema.methods.comparePassword = function (other) {
	return bcrypt.compare(other, this.hashedPassword)
}

module.exports = mongoose.model('User', userSchema)