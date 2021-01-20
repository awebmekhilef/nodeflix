import React from 'react'

import {
	FormControl, Input, FormLabel,
	FormErrorMessage
} from '@chakra-ui/react'
import { Field, useField } from 'formik'

const FormInput = ({ label, ...props }) => {
	const [field, meta] = useField(props)

	return (
		<FormControl mt={5} isInvalid={meta.error && meta.touched} isRequired={props.isRequired}>
			<FormLabel>{label}</FormLabel>
			<Field as={Input} {...field} {...props} />
			<FormErrorMessage>{meta.error}</FormErrorMessage>
		</FormControl>
	)
}

export default FormInput
