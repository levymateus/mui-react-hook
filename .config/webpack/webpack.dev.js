/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check
const path = require('path');
const os = require('os');
const DartSass = require('sass');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ThreadLoader = require('thread-loader');

ThreadLoader.warmup(
	{
		workers: os.cpus().length - 1,
		poolTimeout: Infinity,
	},
	['babel-loader']
);

module.exports = {
	mode: 'development',
	entry: ['react-hot-loader/patch', path.resolve('src/index.tsx')],
	target: 'web',
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve('assets/template.html'),
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		contentBase: path.resolve('assets'),
		watchContentBase: true,
		port: 49052,
		historyApiFallback: true,
		hot: true,
		open: true,
		stats: 'errors-only',
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/i,
				include: path.resolve('src'),
				use: [
					{
						loader: 'thread-loader',
						options: {
							workers: os.cpus().length - 1,
							poolTimeout: Infinity,
						},
					},
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
							babelrc: false,
							presets: [
								'@babel/preset-typescript',
								[
									'@babel/preset-react',
									{
										development: true,
									},
								],
							],
							plugins: ['react-hot-loader/babel'],
						},
					},
				],
			},
			{
				test: /\.css$/i,
				include: path.resolve('node_modules', 'normalize'),
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(scss|sass)$/i,
				include: path.resolve('src'),
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							implementation: DartSass,
						},
					},
				],
			},
		],
	},
};
