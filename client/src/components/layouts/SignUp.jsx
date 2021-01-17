import React from 'react'

import { Formik, Form, Field } from 'formik'
import { FormControl, Input, FormLabel } from '@chakra-ui/react'
import { useAuth } from '../../contexts/authContext'

import FormContainer from '../sections/FormContainer'
import FormButton from '../util/FormButton'

const SignUp = () => {
	const [, setLoggedIn] = useAuth()

	const onSubmit = (values) => {
		setTimeout(() => {
			setLoggedIn(true)
		}, 2000)
	}

	return (
		<FormContainer title='Create an account'>
			<Formik
				initialValues={{ email: 'test@test.com', password: 'password' }}
				onSubmit={onSubmit}
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
