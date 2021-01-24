import React from 'react'

import Header from './components/Header/Header'
import Landing from './containers/Landing'
import SignUp from './containers/SignUp'
import LogIn from './containers/LogIn'
import Home from './containers/Home'
import WatchMovie from './containers/WatchMovie'

import {
	BrowserRouter, Switch, Redirect,
	Route
} from 'react-router-dom'
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
				<ProtectedRoute exact path='/'>
					<Home />
				</ProtectedRoute>

				<ProtectedRoute exact path='/movie/:id'>
					<WatchMovie />
				</ProtectedRoute>

				<AuthRoute exact path='/welcome'>
					<Landing />
				</AuthRoute>

				<AuthRoute exact path='/login'>
					<LogIn />
				</AuthRoute>

				<AuthRoute exact path='/signup'>
					<SignUp />
				</AuthRoute>

				<Route path='*'>
					<Redirect to='/' />
				</Route>
			</Switch>
		</BrowserRouter>
}

export default App
