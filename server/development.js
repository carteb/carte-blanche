/* eslint-disable no-console */

import express from 'express';
import webpack from 'webpack';
import historyApiFallback from 'connect-history-api-fallback';
import config from './webpack.development';

const app = express();
const compiler = webpack(config);

console.log('Starting development server...');

app.use(historyApiFallback({
  verbose: false
}));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('----> Listening at http://localhost:3000');
  console.log('');
  console.log('Building...');
});
