const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './src/SVGAnimate.js',
  output: {
    path: path.join(__dirname, 'plugin'),
    filename: 'SVGAnimate.js',
    libraryTarget: 'umd',
  },
  devServer: {
    contentBase: path.join(__dirname, 'plugin'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      }
    ]
  },
  externals: [
    nodeExternals(),
  ]
};
