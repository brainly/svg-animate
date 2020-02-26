const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SVGAnimate = require('./src/svg-animate');

const devServer = {
  contentBase: path.join(__dirname, 'output'),
  open: true,
};

const serverConfig = {
  target: 'node',
  mode: 'development',
  entry: './server.js',
  output: {
    path: path.join(__dirname, 'output'),
    filename: 'server.js'
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
      outputPath: path.join(__dirname, 'output'),
      outputFile: 'animation.svg',
      options: {
        alternateDirection: true,
      },
    }),
  ]
};

const clientConfig = {
  target: 'web',
  mode: 'development',
  entry: './client.js',
  output: {
    path: path.join(__dirname, 'output'),
    filename: 'client.js'
  },
  devServer,
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/client/index.html',
      animationPath: 'animation.svg'
    }),
  ]
};

module.exports = [serverConfig, clientConfig];
