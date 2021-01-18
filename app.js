require('dotenv').config()

const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('./models/User')

const app = express()

// --------------- SESSION ---------------
app.use(session({
	secret: process.env.SESSION_SECRET,
	saveUninitialized: false,
	resave: false
}))

// --------------- BODY PARSER ---------------
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: false, limit: '50mb' }))

// --------------- PASSPORT ---------------
passport.use(new LocalStrategy({
	usernameField: 'email'
}, (email, password, done) => {
	User.findOne({ email }, function (err, user) {
		if (err) return done(err)

		if (!user) {
			return done(null, false, { message: 'User not found.' })
		}

		if (user.password !== password) {
			return done(null, false, { message: 'Incorrect password.' })
		}

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

const checkAuth = (req, res, next) => {
	if (req.isAuthenticated())
		next()
	else
		res.status(401).end()
}

app.use(passport.initialize())
app.use(passport.session())

// --------------- DATABASE ---------------
mongoose.connect(process.env.DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})

const db = mongoose.connection
db.on('open', () => console.log('Connected to database'))
db.on('error', () => console.error('Error connecting to database'))

// --------------- ROUTES ---------------
app.post('/signup', async (req, res) => {
	const user = new User({
		email: req.body.email,
		password: req.body.password
	})

	try {
		await user.save()

		req.logIn(user, console.log)
		res.status(201).json(user)
	} catch (err) {
		res.status(400).json({
			message: err.message
		})
	}
})

app.post('/login', passport.authenticate('local'), (req, res) => {
	res.json(req.user)
})

app.post('/logout', (req, res) => {
	req.logOut()
	res.end()
})

app.get('/user', checkAuth, (req, res) => {
	res.json(req.user)
})

app.listen(5000)