import React from 'react'

import { Button } from '@chakra-ui/react'

const FormButton = ({ loading }) => {
	return (
		<Button
			mt={5} type='submit' w='full' colorScheme='blue'
			isLoading={loading}
		>
			Continue
		</Button>
	)
}

export default FormButton
