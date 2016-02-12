module.exports = {
	entry: './app/app.js',
	output: {
		filename: './public/bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['stage-2', 'es2015']
				}
			}
		]
	}
};