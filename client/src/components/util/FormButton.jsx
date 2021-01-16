import React from 'react'

import { Button } from '@chakra-ui/react'

const FormButton = ({ disabled, loading }) => {
	return (
		<Button mt={5} type='submit' w='full' colorScheme='blue'
			isDisabled={disabled}
			isLoading={loading}
		>
			Continue
		</Button>
	)
}

export default FormButton
