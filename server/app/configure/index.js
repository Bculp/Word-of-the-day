module.exports = function(app) {

	if (process.env.NODE_ENV != 'production') {
		require('./.keys.js');
	}


	// setValue and getValue are aliases for app.set and app.get
	// used for setting env variables
	// look into improving in future version
	app.setValue = app.set.bind(app);

	app.getValue = function(path) {
		return app.get(path);
	};

	require('./app-variables')(app);

	// Logging middleware
	app.use(app.getValue('log'));

	require('./static-middleware')(app);
};