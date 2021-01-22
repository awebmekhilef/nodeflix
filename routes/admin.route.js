const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')

AdminBro.registerAdapter(AdminBroMongoose)
const adminBro = new AdminBro(require('../config/admin.config'))

module.exports = AdminBroExpress.buildRouter(adminBro)