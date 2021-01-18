const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

const initialize = (passport) => {
	passport.use(new LocalStrategy({
		usernameField: 'email'
	}, (email, password, done) => {
		User.findOne({ email }, async function (err, user) {
			if (err) return done(err)

			if (!user)
				return done(null, false, { message: 'User not found.' })

			if (!await user.comparePassword(password))
				return done(null, false, { message: 'Incorrect password.' })

			return done(null, user)
		})
	}))

	passport.serializeUser((user, done) => {
		done(null, user.id)
	})

	passport.deserializeUser(async (id, done) => {
		try {
			const user = await User.findById(id)

			if (!user)
				return done(new Error('User not found'))

			done(null, user)
		} catch (err) {
			done(err)
		}
	})
}

module.exports = initialize