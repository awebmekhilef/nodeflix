import React from 'react'

import { AspectRatio, Image } from '@chakra-ui/react'

import { Link } from 'react-router-dom'

const MovieTile = ({ id, cover }) => {
	return (
		<Link to={`/movie/${id}`}>
			<AspectRatio ratio={0.699}>
				<Image borderRadius={7} src={`https://storage.googleapis.com/nodeflix.appspot.com/${cover}`} />
			</AspectRatio>
		</Link>
	)
}

export default MovieTile
