import React, { useState, useEffect } from 'react'

import { Box } from '@chakra-ui/react'
import MovieBreadcrumb from '../components/Movie/MovieBreadcrumb'
import VideoPlayer from '../components/Movie/VideoPlayer'
import MovieInfo from '../components/Movie/MovieInfo'

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
		<Box px={3} mt={6} mx='auto' maxW={960}>
			<MovieBreadcrumb title={movie.title} />
			<VideoPlayer id={movie._id} />
			<MovieInfo movie={movie} />
		</Box> :
		null
}

export default WatchMovie
