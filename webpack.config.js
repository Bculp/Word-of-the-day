module.exports = {
	entry: './browser/app/app.js',
	output: {
		path: __dirname,
		filename: './public/bundle.js'
	},
	module: {
		loaders: [
			{ 
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel",
				query: {
					presets: ['react', 'es2015']
				} 
			}
		]
	}
};