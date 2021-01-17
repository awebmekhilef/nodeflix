import React from 'react'

import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

// Redirects to home page if already logged in
const AuthRoute = ({ children, ...rest }) => {
	const [loggedIn] = useAuth()

	return (
		<Route {...rest}
			render={() =>
				loggedIn ? (
					<Redirect
						to='/home'
					/>
				) : (
						children
					)
			}
		/>
	)
}

export default AuthRoute
