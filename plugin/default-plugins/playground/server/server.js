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

var start = (componentBasePath, variationsBasePath, port) => {
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
    // Get all the variations of this component
    fs.readdir(variationsPath, (err, fileNames) => {
      // TODO Error handling
      if (err) {
        res.json({ data: {} });
        return;
      }
      // Return all the data of all the variations of this component
      fileNames.map((fileName, index) => {
        var filePath = path.join(variationsPath, fileName);
        fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
          // TODO Error handling
          if (err) {
            variations[fileName.replace('.js', '')] = {};
          }
          variations[fileName.replace('.js', '')] = data.replace("module.exports = ", '');
          // If we're at the last file, respond to the request
          if (index === fileNames.length - 1) {
            res.json({ data: variations });
            return;
          }
        });
      });
    });
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
      req.query.variation
    );

    try {
      fs.unlink(variationPath, (err) => {
        if (err) {
          res.status(404).send('');
          return;
        }
        res.status(200).send('');
        return;
      });
    } catch (error) {
      res.status(404).send('');
      return;
    }
  });

  app.post('/*', (req, res) => {
    res.status(200).send(`POST ${req.params.component}`);
  });

  server = app.listen(port);
}

var stop = (callback) => {
  server.close(callback);
}

exports.start = start;
exports.stop = stop;
