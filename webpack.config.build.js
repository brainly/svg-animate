const path = require('path');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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

const clientConfig = {
  target: 'web',
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    path: outputPath,
    filename: 'client.js',
  },
  devServer: {
    contentBase: outputPath,
  },
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
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/client/index.html',
      animationPath: '/animation.svg',
    }),
  ],
};

module.exports = [pluginConfig, serverConfig, clientConfig];
