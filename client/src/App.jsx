import React from 'react'

import Landing from './components/layouts/Landing'
import Header from './components/sections/Header'
import SignUp from './components/layouts/SignUp'
import LogIn from './components/layouts/LogIn'
import Home from './components/layouts/Home'

import { BrowserRouter, Switch } from 'react-router-dom'
import AuthRoute from './components/util/AuthRoute'
import ProtectedRoute from './components/util/ProtectedRoute'

function App() {
	return (
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
	)
}

export default App
