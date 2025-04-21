// webpack.config.js
const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  entry: './static/js/react/index.js',  // React entry point
  output: {
    path: path.resolve('./static/bundles/'),
    filename: '[name].js',
    publicPath: '/static/bundles/'
  },
  plugins: [
    new BundleTracker({filename: './webpack-stats.json'})
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};