import React from 'react'

import { Box, Heading, Text } from '@chakra-ui/react'

const MovieInfo = ({ movie }) => {
	return (
		<Box my={6} >
			<Heading size='lg'>{movie.title}</Heading>
			<Text>{movie.description}</Text>
		</Box>
	)
}

export default MovieInfo
