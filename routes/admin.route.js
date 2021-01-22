const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')

const User = require('../models/User')

AdminBro.registerAdapter(AdminBroMongoose)
const adminBro = new AdminBro({
	resources: [User],
	branding: {
		companyName: 'Nodeflix Dashboard',
		softwareBrothers: false
	}
})


module.exports = AdminBroExpress.buildRouter(adminBro)