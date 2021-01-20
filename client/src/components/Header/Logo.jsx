import React from 'react'

import { Box, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Logo = () => {
	return (
		<Box>
			<Text as={Link} to='/'
				color='white' fontSize='2xl' fontWeight='extrabold'
			>
				Nodeflix
      </Text>
		</Box>
	)
}

export default Logo
