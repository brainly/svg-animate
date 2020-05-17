const path = require('path');
const nodeExternals = require('webpack-node-externals');
const outputPath = path.join(__dirname, 'temp');

const pluginConfig = {
  target: 'node',
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: outputPath,
    filename: 'SVGAnimate.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
    ],
  },
  externals: [nodeExternals()],
};

const serverConfig = {
  target: 'node',
  mode: 'development',
  entry: './src/server/index.js',
  output: {
    path: outputPath,
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
    ],
  },
  externals: [nodeExternals()],
};

module.exports = [pluginConfig, serverConfig];
