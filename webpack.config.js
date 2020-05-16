const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const setupServer = require('./temp/server');
const SVGAnimate = require('./temp/SVGAnimate');
const outputPath = path.join(__dirname, 'temp');

const devServer = {
  before: setupServer,
  contentBase: outputPath,
  open: true,
};

const animationConfig = {
  target: 'node',
  mode: 'development',
  entry: './src/frames.js',
  output: {
    path: outputPath,
    filename: 'frames.js'
  },
  devServer,
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.ya?ml$/,
        loader: 'js-yaml-loader',
      }
    ]
  },
  plugins: [
    new SVGAnimate({
      selector: 'animate',
      outputPath,
      outputFile: 'animation.svg',
      options: {
        alternateDirection: true,
        pathPrecision: 0,
      },
    }),
  ]
};

const clientConfig = {
  target: 'web',
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    path: outputPath,
    filename: 'client.js'
  },
  devServer,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/client/index.html',
      animationPath: 'animation.svg'
    }),
  ]
};

module.exports = [animationConfig, clientConfig];
