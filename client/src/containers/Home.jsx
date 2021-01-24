import React, { useState, useEffect } from 'react'

import { Text, Box } from '@chakra-ui/react'

import axios from 'axios'

const Home = () => {
	const [movies, setMovies] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const getMovies = async () => {
			try {
				const res = await axios.get('/movie')
				setMovies(res.data.movies)
			} catch (err) { }
			finally {
				setLoading(false)
			}
		}

		getMovies()
	}, [])

	return loading ?
		'Loading...' :
		(
			<Box>
				{
					movies.map((m) => (
						<Text key={m._id}>{m.title}</Text>
					))
				}
			</Box>
		)
}

export default Home
