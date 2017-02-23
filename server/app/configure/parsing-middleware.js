const bodyParser = require('body-parser');

// Parse POST and PUT bodies

module.exports = function(app) {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true}));
}