import React from 'react'

import FormContainer from '../sections/FormContainer'

import { useAuth } from '../../contexts/authContext'

const Home = () => {
	const { user } = useAuth()

	return (
		<FormContainer title={`Welcome ${user.email}`} />
	)
}

export default Home
