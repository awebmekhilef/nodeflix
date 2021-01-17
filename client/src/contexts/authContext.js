import React, { useContext, useState } from 'react'

const AuthContext = React.createContext(false)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
	const [loggedIn, setLoggedIn] = useState(false)

	return (
		<AuthContext.Provider value={[loggedIn, setLoggedIn]}>
			{children}
		</AuthContext.Provider>
	)
}
