import React, { useState } from 'react'

import { Formik, Form, Field } from 'formik'
import {
	FormControl, Input, FormLabel,
	FormErrorMessage, SimpleGrid
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
	firstName: Yup
		.string()
		.min(2, 'First name must be in between 2 and 15 characters')
		.max(15, 'First name must be in between 2 and 15 characters')
		.required('First name is required'),
	lastName: Yup
		.string(),
	password: Yup
		.string()
		.min(6, 'Password must be a minimum of 6 characters')
		.required('Password is required')
})

const SignUp = () => {
	const { signUp } = useAuth()

	// Error returned by server
	const [apiError, setApiError] = useState('')

	const handleSignUp = async ({ email, password, firstName, lastName },
		{ setSubmitting }) => {
		try {
			await signUp(email, password, firstName, lastName)
		} catch (err) {
			setApiError('Email already in use.')
			setSubmitting(false)
		}
	}

	return (
		<FormContainer title='Create an account'>
			<Formik
				initialValues={{
					firstName: 'John', lastName: '',
					email: 'john@doe.com', password: 'password'
				}}
				onSubmit={handleSignUp}
				validationSchema={validationSchema}
			>
				{({ isSubmitting, errors, touched }) => (
					<Form>
						<SimpleGrid columns={[1, 2]} spacingX={5}>
							<FormControl mt={5} isInvalid={errors.firstName && touched.firstName} isRequired>
								<FormLabel>First name</FormLabel>
								<Field as={Input} name='firstName' type='text' />
								<FormErrorMessage>{errors.firstName}</FormErrorMessage>
							</FormControl>

							<FormControl mt={5} isInvalid={errors.lastName && touched.lastName}>
								<FormLabel>Last name</FormLabel>
								<Field as={Input} name='lastName' type='text' />
								<FormErrorMessage>{errors.lastName}</FormErrorMessage>
							</FormControl>
						</SimpleGrid>

						<FormControl mt={5} isInvalid={errors.email && touched.email} isRequired>
							<FormLabel>Email address</FormLabel>
							<Field as={Input} name='email' type='email' />
							<FormErrorMessage>{errors.email}</FormErrorMessage>
						</FormControl>

						<FormControl mt={5} isInvalid={errors.password && touched.password} isRequired>
							<FormLabel>Password</FormLabel>
							<Field as={Input} name='password' type='password' />
							<FormErrorMessage>{errors.password}</FormErrorMessage>
						</FormControl>

						{apiError && <FormError error={apiError} />}

						<FormButton loading={isSubmitting} />
					</Form>
				)}
			</Formik>
		</FormContainer>
	)
}

export default SignUp 
