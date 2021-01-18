import React, { useContext, useEffect, useState } from 'react'

import axios from 'axios'

const AuthContext = React.createContext(false)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)

	useEffect(() => {
		// Check if the user has a session on the server
		const getUser = async () => {
			try {
				const res = await axios.get('/user')
				setUser(res.data)
			} catch (err) { }
		}

		getUser()
	}, [])

	const signUp = async (email, password) => {
		return await axios.post('/signup', { email, password })
			.then((res) => {
				setUser(res.data)
			})
	}

	const logIn = (email, password) => {
		return axios.post('/login', { email, password })
			.then((res) => {
				setUser(res.data)
			})
	}

	const logOut = async () => {
		return axios.post('/logout')
			.then(() => {
				setUser(false)
			})
	}

	return (
		<AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
			{children}
		</AuthContext.Provider>
	)
}
