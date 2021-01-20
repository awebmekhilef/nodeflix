import React from 'react'

import { Box, Heading, Center } from '@chakra-ui/react'

const FormContainer = ({ children, title }) => {
	return (
		<Box
			mt={16} mx='auto' p={8}
			maxWidth={500} borderWidth={1} borderRadius={8} boxShadow='lg'>
			<Center>
				<Heading>{title}</Heading>
			</Center>
			
			{children}
		</Box>
	)
}

export default FormContainer
