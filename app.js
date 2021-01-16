const app = require('express')()

app.get('*', (req, res) => {
	res.end()
})

app.listen(5000)