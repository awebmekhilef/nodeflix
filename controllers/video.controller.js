const fs = require('fs')
const path = require('path')

const streamVideo = (req, res) => {
	const range = req.headers.range
	const videoPath = path.join(__dirname, '../assets/video.mp4')
	const videoSize = fs.statSync(videoPath).size

	if (range) {
		// Parse Range
		const parts = range.replace('bytes=', '').split('-')
		const start = parseInt(parts[0], 10)
		const end = parts[1] ? parseInt(parts[1], 10) : videoSize - 1

		res.writeHead(206, {
			'Content-Type': 'video/mp4',
			'Content-Range': `bytes ${start}-${end}/${videoSize}`,
			'Content-Length': `${end - start + 1}`,
			'Accept-Ranges': 'bytes',
		})

		const videoStream = fs.createReadStream(videoPath, { start, end })
		videoStream.pipe(res)
	}
	else {
		// If no range given send whole video
		res.writeHead(200, {
			'Content-Type': 'video/mp4',
			'Content-Length': videoSize
		})

		const videoStream = fs.createReadStream(videoPath)
		videoStream.pipe(res)
	}
}

module.exports = {
	streamVideo
}