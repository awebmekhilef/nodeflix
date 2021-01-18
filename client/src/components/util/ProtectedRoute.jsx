import React from 'react'

import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

// Redirects to landing page if not logged in
const AuthRoute = ({ children, ...rest }) => {
	const { user } = useAuth()

	return (
		<Route {...rest}
			render={() =>
				user ? (
					children
				) : (
						<Redirect
							to='/'
						/>
					)
			}
		/>
	)
}

export default AuthRoute
