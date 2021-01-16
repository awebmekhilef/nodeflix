import React from 'react'

import { HStack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import Logo from './Logo'

const Header = () => {
	return (
		<HStack h={70} p={8} bg='gray.900'
			justifyContent='space-between'
		>
			<Logo />

			<Link to='/signin'>
				<Text color='white'>Sign In</Text>
			</Link>
		</HStack>
	)
}

export default Header
