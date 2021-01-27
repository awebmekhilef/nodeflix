import React, { useState, useEffect } from 'react'

import {
	Heading, Text, Box
} from '@chakra-ui/react'

import { useParams } from 'react-router-dom'
import axios from 'axios'

const WatchMovie = () => {
	const { id } = useParams()

	const [movie, setMovie] = useState(null)

	useEffect(() => {
		const getMovie = async () => {
			try {
				const res = await axios.get(`/movie/${id}`)
				setMovie(res.data.movie)
			} catch (err) { }
		}

		getMovie()
	}, [id])

	return movie !== null ?
		<Box m={[2, 4, 6]}>
			<video src={`/movie/${movie._id}/stream`} type='video/mp4' crossOrigin
				height={640} width={360}
				controls autoPlay muted />
			<Heading size='md'>{movie.title}</Heading>
			<Text>{movie.description}</Text>
		</Box> :
		null
}

export default WatchMovie
