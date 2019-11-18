const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: { presets: ['@babel/preset-env'] },
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /\.(woff|woff2|svg|jpe?g|gif|png)$/,
      loader: 'url-loader',
      options: {
        limit: 100000,
      },
    }],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'build/'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      GCAL_CONFIG: {
        clientId: JSON.stringify(process.env.GCAL_CLIENT_ID),
        apiKey: JSON.stringify(process.env.GCAL_API_KEY),
      },
    }),
  ],
};
