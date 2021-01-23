import React from 'react'

import { AspectRatio } from '@chakra-ui/react'

const Home = () => {
	return (
		<AspectRatio mt={16} mx='auto' maxW={720} ratio={16 / 9}>
			<video src='/movie' controls/>
		</AspectRatio>
	)
}

export default Home
