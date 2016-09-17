var path = require('path');

var config = {
  // Gives you sourcemaps without slowing down rebundling
  devtool: 'eval-source-map',
  entry: path.join(__dirname, 'app/main.js'),
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'bundle.js',
    publicPath: '/'
  }
};

module.exports = config;
