const User = require('../models/User')
const Movie = require('../models/Movie')

const passwordFeature = require('@admin-bro/passwords')
const bcrypt = require('bcrypt')

module.exports = {
	resources: [{
		resource: User,
		options: {
			listProperties: ['email', 'firstName', 'lastName'],
			showProperties: ['_id', 'email', 'firstName', 'lastName'],
			editProperties: ['email', 'firstName', 'lastName', 'password'],
			filterProperties: ['_id', 'email', 'firstName', 'lastName']
		},
		features: [passwordFeature({
			properties: {
				encryptedPassword: 'hashedPassword'
			},
			hash: (password) => bcrypt.hash(password, 10)
		})]
	}, Movie],
	branding: {
		companyName: 'Nodeflix Dashboard',
		softwareBrothers: false
	}
}