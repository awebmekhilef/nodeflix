import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './contexts/authContext'

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
