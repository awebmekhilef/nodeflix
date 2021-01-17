import React from 'react'

import { Button, HStack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

import Logo from './Logo'

const Header = () => {
	const [loggedIn, setLoggedIn] = useAuth()

	return (
		<HStack h={70} p={8} bg='gray.900'
			justifyContent='space-between'
		>
			<Logo />

			{
				loggedIn ?
					<Button colorScheme='red'
						onClick={() => setLoggedIn(false)}>
						Log out
					</Button> :
					<Link to='/login'>
						<Text color='white'>Log In</Text>
					</Link>
			}
		</HStack>
	)
}

export default Header
