import React, { useState, useEffect } from 'react'

import { AspectRatio, SimpleGrid, Image } from '@chakra-ui/react'

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
		null :
		(
			<SimpleGrid m={[2,4,6]} columns={[2, 4, 6]} spacing={3}>
				{
					movies.map((m) => (
						<AspectRatio maxW={250} ratio={0.699} key={m._id}>
							<Image src={`https://storage.googleapis.com/nodeflix.appspot.com/${m.coverImageUrl}`} />
						</AspectRatio>
					))
				}
			</SimpleGrid>
		)
}

export default Home
