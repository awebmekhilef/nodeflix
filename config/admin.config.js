const passwordFeature = require('@admin-bro/passwords')
const uploadFeature = require('@admin-bro/upload')
const bcrypt = require('bcrypt')
const path = require('path')

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
			showProperties: ['_id', 'title', 'description', 'coverImageUrl', 'videoFileUrl'],
			editProperties: ['title', 'description', 'cover', 'video']
		},
		features: [uploadFeature({
			provider: {
				gcp: {
					bucket: config.bucketName,
					expires: 0
				}
			},
			properties: {
				key: 'coverImageUrl',
				file: 'cover',
				filePath: 'coverFilePath',
				filesToDelete: 'coverFilesToDelete',
			},
			validation: {
				mimeTypes: ['image/jpeg', 'image/png'],
			},
			uploadPath: (record, filename)=>`${record.id()}/cover${path.extname(filename)}`
		}),
		uploadFeature({
			provider: {
				gcp: {
					bucket: config.bucketName,
					expires: 0
				}
			},
			properties: {
				key: 'videoFileUrl',
				file: 'video',
				filePath: 'videoFilePath',
				filesToDelete: 'videoFilesToDelete',
			},
			validation: {
				mimeTypes: ['video/mp4'],
			},
			uploadPath: (record, filename)=>`${record.id()}/video${path.extname(filename)}`
		})]
	}],
	branding: {
		companyName: 'Nodeflix Dashboard',
		softwareBrothers: false
	}
}