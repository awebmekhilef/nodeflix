import React, { useState } from 'react'

import { Formik, Form, Field } from 'formik'
import {
	FormControl, Input, FormLabel,
	FormErrorMessage
} from '@chakra-ui/react'
import { useAuth } from '../../contexts/authContext'
import * as Yup from 'yup'

import FormContainer from '../sections/FormContainer'
import FormButton from '../util/FormButton'
import FormError from '../util/FormError'

const validationSchema = Yup.object({
	email: Yup
		.string()
		.email('Invalid email address')
		.required('Email is required'),
	password: Yup
		.string()
		.min(6, 'Password must be a minimum of 6 characters')
		.required('Password is required')
})

const SignUp = () => {
	const { signUp } = useAuth()

	// Error returned by server
	const [apiError, setApiError] = useState('')

	const handleSignUp = async ({ email, password }, { setSubmitting }) => {
		try {
			await signUp(email, password)
		} catch (err) {
			setApiError('Email already in use.')
			setSubmitting(false)
		}
	}

	return (
		<FormContainer title='Create an account'>
			<Formik
				initialValues={{ email: '', password: '' }}
				onSubmit={handleSignUp}
				validationSchema={validationSchema}
			>
				{({ isSubmitting, values, errors, touched }) => (
					<Form>
						<FormControl mt={5} isInvalid={errors.email && touched.email}>
							<FormLabel>Email address:</FormLabel>
							<Field as={Input} name='email' type='email' />
							<FormErrorMessage>{errors.email}</FormErrorMessage>
						</FormControl>

						<FormControl mt={5} isInvalid={errors.password && touched.password}>
							<FormLabel>Password:</FormLabel>
							<Field as={Input} name='password' type='password' />
							<FormErrorMessage>{errors.password}</FormErrorMessage>
						</FormControl>

						{ apiError && <FormError error={apiError} />}

						<FormButton
							disabled={
								errors.email ||
								values.email.trim() === '' ||
								values.password.length < 6}
							loading={isSubmitting} />
					</Form>
				)}
			</Formik>
		</FormContainer>
	)
}

export default SignUp 
