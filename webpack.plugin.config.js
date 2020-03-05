const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'temp'),
    filename: 'SVGAnimate.js',
    libraryTarget: 'umd',
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
