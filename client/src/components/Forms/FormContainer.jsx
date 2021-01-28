import React from 'react'

import { Box, Heading, Center } from '@chakra-ui/react'

const FormContainer = ({ children, title }) => {
	return (
		<Box mt={16} mx='auto' maxWidth={510}>
			<Box
				bgColor='white' p={[3, 8]} mx={3}
				borderWidth={1} borderRadius={7} boxShadow='lg'>
				<Center>
					<Heading>{title}</Heading>
				</Center>

				{children}
			</Box>
		</Box>
	)
}

export default FormContainer
