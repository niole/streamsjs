var path = require('path');
var lazyTransformer = require('./lazyTransformer.js');

var config = {
  // Gives you sourcemaps without slowing down rebundling
  devtool: 'eval-source-map',
  entry: path.join(__dirname, 'app/main.js'),
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
      loaders: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'lazyTransformer'
      }]
    },
    resolveLoader: {
        alias: {
          "lazyTransformer": path.join(__dirname, "./lazyTransformer.js")
        }
    }
};

module.exports = config;
