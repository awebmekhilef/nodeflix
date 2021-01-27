import React, { useState, useEffect } from 'react'

import { SimpleGrid, Heading, Box } from '@chakra-ui/react'
import MovieTile from '../components/Movie/MovieTile'

import axios from 'axios'

const Home = () => {
	const [movies, setMovies] = useState([])

	useEffect(() => {
		const getMovies = async () => {
			try {
				const res = await axios.get('/movie')
				setMovies(res.data.movies)
			} catch (err) { }
		}

		getMovies()
	}, [])

	return movies.length !== 0 ?
		<Box mt={8} mx={[3, 4, 6]}>
			<Heading size='lg' mb={3}>Trending today</Heading>
			<SimpleGrid columns={[2, 4, 6]} spacing={5}>
				{
					movies.map((m) => (
						<MovieTile key={m._id} id={m._id} cover={m.coverImageUrl} />
					))
				}
			</SimpleGrid>
		</Box> :
		null
}

export default Home
