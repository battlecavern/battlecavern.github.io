const path = require('path')

module.exports = {
  entry: './main.jsx',
  output: {
    filename: path.resolve(__dirname, 'dist/bundle.js')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'env']
        }
      }
    ]
  }
}
