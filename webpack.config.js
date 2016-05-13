module.exports = {
	entry: {
		index: './test/src/index.js',
	},
	output: {
		path: './test/build/',
		filename: '[name].js',
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel'
		}]
	},
}
