const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VENDOR_LIBS = ['react', 'react-dom', 'bootstrap', 'jquery'];
const config = require('./config');
process.env.NODE_ENV = process.env.NODE_ENV || config.node_env;

module.exports = {
	entry: {
		bundle: './src/index.js',
		back_bundle: './src/backend/index.jsx',
		vendor: VENDOR_LIBS
	},
	output: {
		path: path.join(__dirname, '/public'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				use: 'babel-loader',
				test: /.jsx?$/,
				exclude: /node_modules/
			},
			{
			loader: ['style-loader', 'css-loader'],
			test: /.css$/
			},
			{
        	test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        	loader: 'url?limit=10000&mimetype=application/octet-stream'
      		},
      		{
      		loader: 'url?limit=10000!img?progressive=true',
      		test:  /\.(jpe?g|png|gif|svg)$/i
      		}
		]
	},

	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jquery: 'jquery',
			jQuery: 'jquery'
		}),
		new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "vendor.js"}),
		new ExtractTextPlugin("./styles/bootstrap.css"),
		new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)})
	],

	resolve: {

		extensions: ['.js', '.jsx']
	}
}