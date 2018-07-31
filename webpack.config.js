const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    'background': './src/background.js',
    'content': './src/content.js',
    'content-page-bridge': './src/content-page-bridge.js',
    'page': './src/page.jsx',
    'popup': './src/popup.jsx',
  },
  mode,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.ProvidePlugin({
      regeneratorRuntime: 'regenerator-runtime',
    }),
    new HtmlWebpackPlugin({
      filename: 'page.html',
      chunks: ['page'],
    }),
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/manifest.json',
        to: 'manifest.json',
      },
    ]),
  ],
  devtool: mode !== 'production' ? 'inline-source-map' : false,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|png)$/,
        use: 'file-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules'],
            },
          },
        ],
      },
    ],
  },
};
