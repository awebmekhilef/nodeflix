import React, { useContext, useEffect, useState } from 'react'

import axios from 'axios'

const AuthContext = React.createContext(false)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true) // When unsure of auth state dont show anything

	useEffect(() => {
		// Check if the user has a session on the server
		const getUser = async () => {
			try {
				const res = await axios.get('/auth/user')
				setUser(res.data.user)
			} catch (err) { }
			finally {
				setLoading(false)
			}
		}

		getUser()
	}, [])

	const signUp = (email, password) => {
		return axios.post('/auth/signup', { email, password })
			.then((res) => {
				setUser(res.data.user)
			})
	}

	const logIn = (email, password) => {
		return axios.post('/auth/login', { email, password })
			.then((res) => {
				setUser(res.data.user)
			})
	}

	const logOut = () => {
		return axios.post('/auth/logout')
			.then(() => {
				setUser(false)
			})
	}

	return (
		<AuthContext.Provider value={{ user, loading, signUp, logIn, logOut }}>
			{children}
		</AuthContext.Provider>
	)
}
