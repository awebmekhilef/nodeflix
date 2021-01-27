import React from 'react'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

import { Link } from 'react-router-dom'

const MovieBreadcrumb = ({ title }) => {
	return (
		<Breadcrumb mb={2}>
			<BreadcrumbItem>
				<BreadcrumbLink as={Link} to="/movie">
					Movies
					</BreadcrumbLink>
			</BreadcrumbItem>

			<BreadcrumbItem isCurrentPage>
				<BreadcrumbLink>{title}</BreadcrumbLink>
			</BreadcrumbItem>
		</Breadcrumb>
	)
}

export default MovieBreadcrumb
