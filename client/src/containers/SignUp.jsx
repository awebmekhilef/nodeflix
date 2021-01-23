import React, { useState } from 'react'

import { Formik, Form } from 'formik'
import { SimpleGrid } from '@chakra-ui/react'
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
	const [error, setError] = useState('')

	const handleSignUp = async ({ email, password, firstName, lastName },
		{ setSubmitting }) => {
		try {
			await signUp(email, password, firstName, lastName)
		} catch (err) {
			setError('Email already in use.')
			setSubmitting(false)
		}
	}

	return (
		<FormContainer title='Create an account'>
			<Formik
				initialValues={{
					firstName: 'John', lastName: 'Doe',
					email: 'john@doe.com', password: 'password'
				}}
				validationSchema={validationSchema}
				onSubmit={handleSignUp}
			>
				{({ isSubmitting }) => (
					<Form>
						<SimpleGrid columns={[1, 2]} spacingX={5}>
							<FormInput
								label='First name'
								name='firstName'
								type='text'
								isRequired
							/>

							<FormInput
								label='Last name'
								name='lastName'
								type='text'
							/>
						</SimpleGrid>

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

export default SignUp 
