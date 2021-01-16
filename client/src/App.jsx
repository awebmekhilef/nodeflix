import React from 'react'

import Header from './components/sections/Header'
import Landing from './components/layouts/Landing'
import SignIn from './components/layouts/SignIn'
import SignUp from './components/layouts/SignUp'

import {
	BrowserRouter, Switch, Route
} from 'react-router-dom'

function App() {
	return (
		<BrowserRouter>
			<Header />

			<Switch>
				<Route exact path='/' component={Landing} />
				<Route path='/signin' component={SignIn} />
				<Route path='/signup' component={SignUp} />
				<SignIn />
			</Switch>
		</BrowserRouter>
	)
}

export default App
