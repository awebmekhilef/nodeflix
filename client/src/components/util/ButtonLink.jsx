import React from 'react'

import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const ButtonLink = ({ children, to, ...rest }) => {
	return (
		<Link to={to}>
			<Button {...rest}>
				{children}
			</Button>
		</Link>
	)
}

export default ButtonLink
