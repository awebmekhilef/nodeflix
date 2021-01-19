import React from 'react'

import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react'

const FormError = ({ error }) => {
	return (
		<Alert mt={5} status='error'>
			<AlertIcon />
			<AlertTitle>{error}</AlertTitle>
		</Alert>
	)
}

export default FormError
