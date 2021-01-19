import React, { useState } from 'react'

import { Formik, Form, Field } from 'formik'
import { FormControl, Input, FormLabel } from '@chakra-ui/react'
import { useAuth } from '../../contexts/authContext'

import FormContainer from '../sections/FormContainer'
import FormButton from '../util/FormButton'
import FormError from '../util/FormError'

const LogIn = () => {
	const { logIn } = useAuth()

	const [error, setError] = useState('')

	const handleLogIn = async ({ email, password }, { setSubmitting }) => {
		try {
			await logIn(email, password)
		} catch (err) {
			setError('Incorrent email or password.')
			setSubmitting(false)
		}
	}

	return (
		<FormContainer title='Log In'>
			<Formik
				initialValues={{ email: 'john@doe.com', password: 'password' }}
				onSubmit={handleLogIn}
			>
				{({ isSubmitting }) => (
					<Form>
						<FormControl mt={5} isRequired>
							<FormLabel>Email address</FormLabel>
							<Field as={Input} name='email' type='email' />
						</FormControl>

						<FormControl mt={5} isRequired>
							<FormLabel>Password</FormLabel>
							<Field as={Input} name='password' type='password' />
						</FormControl>

						{error && <FormError error={error} />}

						<FormButton loading={isSubmitting} />
					</Form>
				)}
			</Formik>
		</FormContainer>
	)
}

export default LogIn
