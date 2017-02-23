const path = require('path');
const express = require('express');
const app = express();
module.exports = app;

// Pass express app into configuration fn at server/app/configure/index.js
require('./configure')(app);

app.use('/api', require('./routes'));

// Catch URLs that resemble file ext that bypass express.static
app.use((req, res, next) => {
	if (path.extname(req.path).length > 0) {
		res.sendStatus(404);
	} else {
		next(null);
	}
});

app.get('/*', (req, res) => {
	res.sendFile(app.get('indexHTMLPath'));
});

// Error catching
app.use((err, req, res, next) => {
	console.error(err, typeof next);
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || 'Internal server error.');
});