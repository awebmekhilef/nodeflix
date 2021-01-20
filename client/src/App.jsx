import React from 'react'

import Header from './components/Header/Header'
import Landing from './containers/Landing'
import SignUp from './containers/SignUp'
import LogIn from './containers/LogIn'
import Home from './containers/Home'

import { BrowserRouter, Switch } from 'react-router-dom'
import { Spinner, Center } from '@chakra-ui/react'

import AuthRoute from './components/util/AuthRoute'
import ProtectedRoute from './components/util/ProtectedRoute'
import { useAuth } from './contexts/authContext'

function App() {
	const { loading } = useAuth()

	return loading ?
		<Center h='100vh'>
			<Spinner size='xl' />
		</Center> :
		<BrowserRouter>
			<Header />
			<Switch>
				<AuthRoute exact path='/'>
					<Landing />
				</AuthRoute>

				<ProtectedRoute path='/home'>
					<Home />
				</ProtectedRoute>

				<AuthRoute path='/login'>
					<LogIn />
				</AuthRoute>

				<AuthRoute path='/signup'>
					<SignUp />
				</AuthRoute>
			</Switch>
		</BrowserRouter>
}

export default App
