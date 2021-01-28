import React from 'react'

import {
	AspectRatio, Image, Popover,
	PopoverTrigger, PopoverBody, PopoverFooter,
	PopoverContent, PopoverArrow, PopoverHeader,
	Button, Badge, Text
} from '@chakra-ui/react'
import ButtonLink from '../util/ButtonLink'


import { Link } from 'react-router-dom'

const MovieTile = ({ movie }) => {
	return (
		<Popover trigger='hover' placement='auto'>
			<PopoverTrigger>
				<Link to={`/movie/${movie._id}`}>
					<AspectRatio ratio={0.699}>
						<Image borderRadius={7}
							src={`https://storage.googleapis.com/nodeflix.appspot.com/${movie.coverImageUrl}`} />
					</AspectRatio>
				</Link>
			</PopoverTrigger>
			<PopoverContent>
				<PopoverArrow />
				<PopoverHeader pt={4} border={0}>
					<Text fontWeight='bold'>
						{movie.title}
						<Badge ml={2} mb={1} colorScheme='yellow'>★ 4.5</Badge>
					</Text>
				</PopoverHeader>
				<PopoverBody>
					<Text noOfLines={4} isTruncated>
						{movie.description}
					</Text>
				</PopoverBody>
				<PopoverFooter>
					<ButtonLink
						to={`/movie/${movie._id}`} w='full'
						colorScheme='blue' size='sm'
					>
						Watch Movie
					</ButtonLink>
					<Button mt={2}
						w='full' size='sm'
					>
						Add to watch later
					</Button>
				</PopoverFooter>
			</PopoverContent>
		</Popover>
	)
}

export default MovieTile
