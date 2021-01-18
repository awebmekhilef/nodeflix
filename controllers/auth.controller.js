const User = require('../models/User')

const signUp = async (req, res) => {
	const user = new User({
		email: req.body.email,
		password: req.body.password
	})

	try {
		await user.save()

		req.logIn(user, console.error)
		res.status(201).json({ user })
	} catch (err) {
		res.sendStatus(400)
	}
}

const logOut = (req, res) => {
	req.logOut()
	res.end()
}

const getUser = (req, res) => {
	res.json({ user: req.user })
}

module.exports = {
	signUp,
	logOut,
	getUser
}