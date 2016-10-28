webpack = require('webpack');
module.exports = {
  entry: './src/app.js',
  output: {
    path: './bin',
    filename: 'app.bundle.js',
    publicPath: '/bin/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  devServer: { inline: true },
  plugins: [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        mangle: false
      })
    ]
}
