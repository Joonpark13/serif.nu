const path = require('path');
const webpack = require('webpack');

module.exports = {
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
        limit: 100000,
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
      FIREBASE_CONFIG: {
        apiKey: JSON.stringify(process.env.FIREBASE_API_KEY),
        authDomain: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        databaseURL: JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        projectId: JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        storageBucket: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        messagingSenderId: JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
        appId: JSON.stringify(process.env.FIREBASE_APP_ID),
      },
    }),
  ],
};
