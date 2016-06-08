/* eslint consistent-return:0,no-console:0 */
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();

// Initialize frontend middleware that will serve your JS app
const webpackConfig = require('../webpack.dev.babel.js');
const compiler = webpack(webpackConfig);
const middleware = webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  silent: true,
  stats: 'errors-only',
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));

// Since webpackDevMiddleware uses memory-fs internally to store build
// artifacts, we use it instead
const fs = middleware.fileSystem;

app.get('*', (req, res) => {
  const file = fs.readFileSync(path.join(compiler.outputPath, 'index.html'));
  res.send(file.toString());
});

// Start the express server
app.listen(8080, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Express server started at localhost:3000');
});
