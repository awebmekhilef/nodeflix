const User = require('../models/User')
const bcrypt = require('bcrypt')

const cleanUser = (user) => {
	const newUser = JSON.parse(JSON.stringify(user))
	delete newUser.hashedPassword
	return newUser
}

const signUp = async (req, res) => {
	try {
		const { email, password, firstName, lastName } = req.body
		const hashedPassword = await bcrypt.hash(password, 10)

		const user = new User({
			email,
			firstName,
			lastName,
			hashedPassword
		})

		await user.save()

		req.logIn(user, console.error)
		res.status(201).json({ user: cleanUser(user) })
	} catch (err) {
		res.sendStatus(400)
	}
}

const logOut = (req, res) => {
	req.logOut()
	res.end()
}

const getUser = (req, res) => {
	res.json({ user: cleanUser(req.user) })
}

module.exports = {
	signUp,
	logOut,
	getUser
}