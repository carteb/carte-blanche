/* eslint-disable no-console */

import express from 'express';
import webpack from 'webpack';
import historyApiFallback from 'connect-history-api-fallback';
import config from './webpack.client.dev';

const app = express();
const compiler = webpack(config);

console.log('Starting client development server...');

app.use(historyApiFallback({
  verbose: false
}));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: false,
  publicPath: config.output.publicPath
}));

app.listen(3001, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('----> Listening at http://localhost:3001\n');
  console.log('Building...');
});
