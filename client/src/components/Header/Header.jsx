import React from 'react'

import { Button, HStack, Text } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

import Logo from './Logo'

const Header = () => {
	const { user, logOut } = useAuth()
	const location = useLocation()

	return (
		<HStack h={70} p={8}
			bgColor={location.pathname === '/' ? 'transparent' : 'white'}
			boxShadow={location.pathname === '/' ? 'none' : 'base'}
			color={location.pathname === '/' ? 'white' : 'black'}
			justifyContent='space-between'
		>
			<Logo />

			{
				user ?
					<Button colorScheme='red'
						onClick={logOut}
					>
						Log out
					</Button> :
					<Link to='/login'>
						<Text fontWeight='bold'>Log In</Text>
					</Link>
			}
		</HStack>
	)
}

export default Header
