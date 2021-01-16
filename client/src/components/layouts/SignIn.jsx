import React from 'react'

import { Formik, Form, Field } from 'formik'
import { FormControl, Input, FormLabel } from '@chakra-ui/react'

import FormContainer from '../util/FormContainer'
import FormButton from '../util/FormButton'

const SignIn = () => {
	const onSubmit = (values, { setSubmitting }) => {
		setTimeout(() => {
			setSubmitting(false)
			console.log(values)
		}, 2000);
	}

	return (
		<FormContainer title='Sign In'>
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

						<FormButton disabled={values.email.trim() == '' ||
							values.password.trim() === ''}
							loading={isSubmitting} />
					</Form>
				)}
			</Formik>
		</FormContainer>
	)
}

export default SignIn
