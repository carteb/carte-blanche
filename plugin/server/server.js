/* eslint-disable */
var express = require('express');
var app = express();
var server;

app.get('/:component', (req, res) => {
  res.status(200).send(`GET ${req.params.component}`);
});

app.post('/:component', (req, res) => {
  res.status(200).send(`POST ${req.params.component}`);
});

function start() {
  var port = 8000;
  server = app.listen(port);
  console.log('\n\n--------------------------------------');
  console.log('Playground Server listening to port: ' + port);
  console.log('---------------------------------------\n\n');
}

function stop(callback) {
  server.close(callback);
}

exports.start = start;
exports.stop = stop;
