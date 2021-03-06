const server = require('http').createServer();

function createApplication() {
	let app = require('./app');
	server.on('request', app);
}

function startServer() {
	let PORT = process.env.PORT || 3000;
	server.listen(PORT, () => console.log('Server started on port', PORT));
}

createApplication()
startServer()