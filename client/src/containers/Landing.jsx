import React from 'react'

import ButtonLink from '../components/util/ButtonLink'
import FormContainer from '../components/Forms/FormContainer'

const Landing = () => {
	return (
		<FormContainer>
		<ButtonLink to='/signup' size='lg' w='full' colorScheme='blue'>
			Create an account
		</ButtonLink>
		</FormContainer>
	)
}

export default Landing
