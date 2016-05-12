/* eslint-disable */
var express = require('express');
var path = require('path');
var fs = require('fs');
var server;

/**
 * Checks if a file at a certain path exists
 *
 * @param  {string} path
 * @return {bool}
 */
var fileExists = (path) => {
  try {
    fs.accessSync(path, fs.R_OK && fs.W_OK);
    return true;
  } catch (error) {
    return false;
  }
}

var start = (componentBasePath, variationsBasePath) => {
  var app = express();

  /**
   * GET /*
   */
  app.get('/*', (req, res) => {
    // Get the path of the component from the base path and the passed in parameter
    var componentPath = path.join(componentBasePath, req.params[0]);
    // If no file exists at the component path, bail out early
    if (fileExists(componentPath) === false) {
      res.json({ data: {} });
      return;
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

  /**
   * DELETE /*
   */
  app.delete('/*', (req, res) => {
    var componentPath = path.join(componentBasePath, req.params[0]);
    if (fileExists(componentPath) === false) {
      res.status(404).send('');
    }

    var variationPath = path.join(
      variationsBasePath,
      req.params[0].replace('.js', ''),
      req.query.variation,
    );

    try {
      fs.unlinkSync(variationPath);
      res.status(200).send('');
    } catch (error) {
      res.status(404).send('');
    }
  });

  app.post('/*', (req, res) => {
    res.status(200).send(`POST ${req.params.component}`);
  });

  var port = 8000;
  server = app.listen(port);
}

var stop = (callback) => {
  server.close(callback);
}

exports.start = start;
exports.stop = stop;
