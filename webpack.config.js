var path = require('path');

module.exports = {
  entry: './app_client/src/index.js',

  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public/javascripts/')
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader'
      }
    ]
  }
};
