import React from 'react'

import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const ButtonLink = ({ children, to, ...rest }) => {
	return (
		<Button {...rest}>
			<Link to={to}>
				{children}
			</Link>
		</Button>
	)
}

export default ButtonLink
