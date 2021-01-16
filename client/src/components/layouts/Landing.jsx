import React from 'react'

import ButtonLink from '../util/ButtonLink'
import FormContainer from '../util/FormContainer'

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
