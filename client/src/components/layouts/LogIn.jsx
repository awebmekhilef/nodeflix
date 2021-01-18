import React from 'react'

import { Formik, Form, Field } from 'formik'
import { FormControl, Input, FormLabel } from '@chakra-ui/react'
import { useAuth } from '../../contexts/authContext'

import FormContainer from '../sections/FormContainer'
import FormButton from '../util/FormButton'

const LogIn = () => {
	const { logIn } = useAuth()

	const handleLogIn = async ({ email, password }, { setSubmitting }) => {
		try {
			await logIn(email, password)
		} catch (err) {
			console.log('Error logging in')
			setSubmitting(false)
		}
	}

	return (
		<FormContainer title='Log In'>
			<Formik
				initialValues={{ email: 'test@test.com', password: 'password' }}
				onSubmit={handleLogIn}
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

export default LogIn
