import React from 'react'

import { Formik, Form, Field } from 'formik'
import { FormControl, Input, FormLabel } from '@chakra-ui/react'
import { useAuth } from '../../contexts/authContext'

import FormContainer from '../sections/FormContainer'
import FormButton from '../util/FormButton'

const SignUp = () => {
	const { signUp } = useAuth()

	const handleSignUp = async ({ email, password }, { setSubmitting }) => {
		try {
			await signUp(email, password)
		} catch (err) {
			console.log('Error signing up')
			setSubmitting(false)
		}
	}
	return (
		<FormContainer title='Create an account'>
			<Formik
				initialValues={{ email: 'test@test.com', password: 'password' }}
				onSubmit={handleSignUp}
			>
				{({ isSubmitting, values }) => (
					<Form>
						<FormControl mt={5}>
							<FormLabel>Email address:</FormLabel>
							<Field as={Input} name='email' type='email' />
						</FormControl>

						<FormControl mt={5}>
							<FormLabel>Password:</FormLabel>
							<Field as={Input} name='password' type='password' />
						</FormControl>

						<FormButton disabled={values.email.trim() === '' ||
							values.password.trim() === ''}
							loading={isSubmitting} />
					</Form>
				)}
			</Formik>
		</FormContainer>
	)
}

export default SignUp 
