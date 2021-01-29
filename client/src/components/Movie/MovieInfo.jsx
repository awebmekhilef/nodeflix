import React, { useEffect, useState } from 'react'

import { Box, Heading, Text } from '@chakra-ui/react'
import ReactStars from 'react-rating-stars-component'
import { FaRegStar, FaRegPaperPlane, FaStar } from 'react-icons/fa'

import axios from 'axios'

const MovieInfo = ({ movie }) => {
	const [rating, setRating] = useState(-1)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const getUserRating = async () => {
			try {
				const res = await axios.get(`/movie/${movie._id}/rate`)

				if (res.data.rating)
					setRating(res.data.rating)
			} catch (err) { }
			finally {
				setLoading(false)
			}
		}

		getUserRating()
	}, [movie._id])

	const handleRatingChange = async (rating) => {
		try {
			await axios.post(`/movie/${movie._id}/rate`, {
				rating
			})

			setRating(rating)
		} catch (err) { }
	}

	const getFinalRating = () => {
		if (movie.rateCount !== 0) {
			if (rating !== -1)
				return rating
			else
				return Math.round((movie.rateValue / movie.rateCount) * 2) / 2
		} else {
			return 0
		}
	}

	return !loading ?
		<Box my={6}>
			<Heading size='lg'>{movie.title}</Heading>
			<Text mt={1}>{movie.description}</Text>

			<ReactStars
				count={5}
				onChange={handleRatingChange}
				value={getFinalRating()}
				size={28}
				emptyIcon={<FaRegStar />}
				halfIcon={<FaRegPaperPlane />}
				fullIcon={<FaStar />}
				activeColor="#ffd700"
				isHalf
			/>
		</Box> :
		null
}

export default MovieInfo
