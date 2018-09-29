const path = require('path');
const webpack = require('webpack');

module.exports = env => ({
  entry: './src/index.js',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: { presets: ['env'] },
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /\.(woff|woff2|svg|jpe?g|gif|png)$/,
      loader: 'url-loader',
      options: {
        limit: 50000,
      },
    }],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify(env.API_URL),
      },
    }),
  ],
});
