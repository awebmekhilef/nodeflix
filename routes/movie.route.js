const router = require('express').Router()

const movieController = require('../controllers/movie.controller')
const { checkAuth } = require('../middleware/auth.middleware')

router.get('/', checkAuth, movieController.getAll)

router.get('/:id', checkAuth, movieController.get)

router.get('/:id/rate', checkAuth, movieController.getMovieRating)

router.post('/:id/rate', checkAuth, movieController.rateMovie)

router.get('/:id/stream',checkAuth,  movieController.streamMovie)

module.exports = router