import React, { useState, useEffect } from 'react'

import {
	Heading, Image,	Text, Box
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
	}, [])

	return movie !== null ?
		<Box m={[2, 4, 6]}>
			<Image maxW={250} src={`https://storage.googleapis.com/nodeflix.appspot.com/${movie.coverImageUrl}`} />
			<Heading size='md'>{movie.title}</Heading>
			<Text>{movie.description}</Text>
		</Box> :
		null
}

export default WatchMovie
