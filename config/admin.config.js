const User = require('../models/User')

module.exports = {
	resources: [{
		resource: User,
		options: {
			listProperties: ['email', 'firstName', 'lastName'],
			editProperties: ['email', 'firstName', 'lastName'],
		}
	}],
	branding: {
		companyName: 'Nodeflix Dashboard',
		softwareBrothers: false
	}
}