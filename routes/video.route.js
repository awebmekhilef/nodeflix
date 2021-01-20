const router = require('express').Router()
const videoController = require('../controllers/video.controller')

router.get('/', videoController.streamVideo)

module.exports = router