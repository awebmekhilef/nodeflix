import React from 'react'

import { Box, Center, Heading, Text } from '@chakra-ui/react'
import ButtonLink from '../components/util/ButtonLink'
import bg from '../assets/movie_posters.jpg'

const Landing = () => {
	return (
		<Center
			bgGradient={`linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 35%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0.85) 100%), url(${bg})`}
			bgSize='cover'
			h='100vh' w='100%'
			pos='absolute'
			left={0}
			top={0}
			zIndex={-1}
			color='white'
		>
			<Box maxW={600} mx={3}>
				<Heading textAlign='center' size='3xl'>Lorem ipsum dolor sit amet.</Heading>
				<Text mt={5} textAlign='center' fontSize='2xl'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, explicabo.
				</Text>
					<ButtonLink
						to='/signup'
						colorScheme='blue'
						size='lg'
						mt={5}
						w='full'
					>
						Get Started!
				</ButtonLink>
			</Box>
		</Center>
	)
}

export default Landing
