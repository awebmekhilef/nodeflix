const config = {
	dbUrl: process.env.DB_URI || 'mongodb://localhost/nodeflix-db',
	port: process.env.PORT || 5000,
	env: process.env.NODE_ENV || 'development',
	sessionSecret: process.env.SESSION_SECRET || 'secret',
	googleConfigBase64: process.env.GOOGLE_CONFIG_BASE64,
	bucketName: process.env.BUCKET_NAME
}

module.exports = config;