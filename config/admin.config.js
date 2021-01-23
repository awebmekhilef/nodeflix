const passwordFeature = require('@admin-bro/passwords')
const uploadFeature = require('@admin-bro/upload')
const bcrypt = require('bcrypt')

const User = require('../models/User')
const Movie = require('../models/Movie')
const config = require('./')

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
	}, {
		resource: Movie,
		options: {
			listProperties: ['title', 'description'],
			showProperties: ['_id', 'title', 'description', 'coverImageUrl'],
			editProperties: ['title', 'description', 'cover']
		},
		features: [uploadFeature({
			provider: {
				gcp: {
					bucket: config.bucketName,
					expires: 0
				}
			},
			properties: {
				file: 'cover',
				key: 'coverImageUrl'
			}
		})]
	}],
	branding: {
		companyName: 'Nodeflix Dashboard',
		softwareBrothers: false
	}
}