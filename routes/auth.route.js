const router = require('express').Router()
const passport = require('passport')

const authController = require('../controllers/auth.controller')
const { checkAuth } = require('../controllers/middleware')

router.post('/signup', authController.signUp)

router.post('/login', passport.authenticate('local'), authController.getUser)

router.post('/logout', authController.logOut)

router.get('/user', checkAuth, authController.getUser)

module.exports = router