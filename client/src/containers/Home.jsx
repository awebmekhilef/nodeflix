import React from 'react'

import FormContainer from '../components/Forms/FormContainer'

import { useAuth } from '../contexts/authContext'

const Home = () => {
	const { user } = useAuth()

	return (
		<FormContainer title={`Welcome, ${user.firstName}`} />
	)
}

export default Home
