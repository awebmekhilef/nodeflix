const router = require('express').Router()
const movieController = require('../controllers/movie.controller')

router.get('/:id', movieController.get)

router.get('/', movieController.getAll)

module.exports = router