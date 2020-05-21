const path = require('path');
const setupServer = require('./temp/server');
const SVGAnimate = require('./temp/SVGAnimate');
const outputPath = path.join(__dirname, 'temp');

const animationConfig = {
  target: 'node',
  mode: 'development',
  entry: './src/frames.js',
  output: {
    path: outputPath,
    filename: 'frames.js',
  },
  devServer: {
    before: setupServer,
    contentBase: outputPath,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
      {
        test: /\.ya?ml$/,
        loader: 'js-yaml-loader',
      },
    ],
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
  ],
};

module.exports = [animationConfig];
