import React from 'react'

import { AspectRatio } from '@chakra-ui/react'

const VideoPlayer = ({ id }) => {
	return (
		<AspectRatio ratio={16 / 9}>
			<video src={`/movie/${id}/stream`} type='video/mp4'
				crossOrigin controls />
		</AspectRatio>
	)
}

export default VideoPlayer
