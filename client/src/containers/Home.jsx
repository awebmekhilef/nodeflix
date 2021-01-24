import React, { useState, useEffect } from 'react'

import {
	AspectRatio, SimpleGrid, Image
} from '@chakra-ui/react'

import axios from 'axios'
import { Link } from 'react-router-dom'

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
		<SimpleGrid m={[2, 4, 6]} columns={[2, 4, 6]} spacing={3}>
			{
				movies.map((m) => (
					<Link to={`/movie/${m._id}`} key={m._id}>
						<AspectRatio ratio={0.699}>
							<Image src={`https://storage.googleapis.com/nodeflix.appspot.com/${m.coverImageUrl}`} />
						</AspectRatio>
					</Link>
				))
			}
		</SimpleGrid> :
		null
}

export default Home
