/* eslint-disable */
var express = require('express');
var path = require('path');
var fs = require('fs');
var server;

function start(componentBasePath, variationsBasePath) {
  var app = express();

  app.get('/*', (req, res) => {
    var componentPath = path.join(componentBasePath, req.params[0]);

    // return an empty array response in case the component has no variations data
    try {
      fs.accessSync(componentPath, fs.R_OK);
    } catch (error) {
      res.json({ data: {} });
    }

    var variationsPath = path.join(variationsBasePath, req.params[0].replace('.js', ''));
    var variations = {};
    var fileNames = fs.readdirSync(variationsPath);
    fileNames.map((fileName) => {
      var filePath = path.join(variationsPath, fileName);
      var content = fs.readFileSync(filePath, { encoding: 'utf8' });
      variations[fileName.replace('.js', '')] = content.replace("module.exports = ", '');
    });
    res.json({ data: variations });
  });

  app.post('/*', (req, res) => {
    res.status(200).send(`POST ${req.params.component}`);
  });

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
