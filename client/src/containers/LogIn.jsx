import React, { useState } from 'react'

import { Formik, Form } from 'formik'
import { useAuth } from '../contexts/authContext'
import * as Yup from 'yup'

import FormContainer from '../components/Forms/FormContainer'
import FormButton from '../components/Forms/FormButton'
import FormError from '../components/Forms/FormError'
import FormInput from '../components/Forms/FormInput'

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

const LogIn = () => {
	const { logIn } = useAuth()

	// Error returned by server
	const [error, setError] = useState('')

	const handleLogIn = async ({ email, password }, { setSubmitting }) => {
		try {
			await logIn(email, password)
		} catch (err) {
			setError('Incorrect email or password.')
			setSubmitting(false)
		}
	}

	return (
		<FormContainer title='Log In'>
			<Formik
				initialValues={{ email: 'john@doe.com', password: 'password' }}
				validationSchema={validationSchema}
				onSubmit={handleLogIn}
			>
				{({ isSubmitting }) => (
					<Form>
						<FormInput
							label='Email address'
							name='email'
							type='email'
							isRequired
						/>

						<FormInput
							label='Password'
							name='password'
							type='password'
							isRequired
						/>

						{error && <FormError error={error} />}

						<FormButton loading={isSubmitting} />
					</Form>
				)}
			</Formik>
		</FormContainer>
	)
}

export default LogIn
