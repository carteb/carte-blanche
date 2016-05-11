const express = require('express');
const app = express();
let server;

app.get('/:component', (req, res) => {
  res.status(200).send(`GET ${req.params.component}`);
});

app.post('/:component', (req, res) => {
  res.status(200).send(`POST ${req.params.component}`);
});

function start() {
  const port = 8000;
  server = app.listen(port);
  /* eslint-disable no-console */
  console.log('\n\n--------------------------------------');
  console.log(`Playground Server listening to port: ${port}`);
  console.log('---------------------------------------\n\n');
}

function stop() {
  server.close();
}

exports.start = start;
exports.stop = stop;
