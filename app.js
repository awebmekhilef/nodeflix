require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const config = require('./config')
const firebase = require('firebase-admin')

const app = express()

// --------------- EXPRESS SETUP ---------------
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// --------------- FIREBASE ---------------
firebase.initializeApp({
	storageBucket: config.bucketName
})

// --------------- SESSION ---------------
app.use(require('express-session')({
	secret: config.sessionSecret,
	saveUninitialized: false,
	resave: false
}))

// --------------- BODY PARSER ---------------
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: false, limit: '5mb' }))

// --------------- PASSPORT -------------
require('./config/passport.config')(passport)

app.use(passport.initialize())
app.use(passport.session())

// --------------- DATABASE ---------------
mongoose.connect(config.dbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
})

const db = mongoose.connection
db.on('open', () => console.log('Connected to database'))
db.on('error', () => console.error('Error connecting to database'))

// --------------- ROUTES ---------------
app.use('/admin', require('./routes/admin.route'))
app.use('/auth', require('./routes/auth.route'))
app.use('/movie', require('./routes/movie.route'))

app.listen(config.port)