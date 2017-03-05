const path = require('path');
const loggingMiddleware = require('volleyball');
const rootPath = path.join(__dirname, '../../../');
const indexPath = path.join(rootPath, './public/index.html');
// const faviconPath = path.join(rootPath, './public/favicon.io');

module.exports = function(app) {
	app.setValue('projectRoot', rootPath);
	app.setValue('indexHTMLPath', indexPath);
	// app.setValue('faviconPath', faviconPath);
	app.setValue('log', loggingMiddleware);
};