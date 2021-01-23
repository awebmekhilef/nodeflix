const config = {
	dbUrl: process.env.DB_URI || 'mongodb://localhost/nodeflix-db',
	port: process.env.PORT || 5000,
	env: process.env.NODE_ENV || 'development',
	sessionSecret: process.env.SESSION_SECRET || 'secret',
	bucketName: process.env.BUCKET_NAME || 'nodeflix.appspot.com'
}

module.exports = config;