/* eslint-disable */
var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var server;
var jsonBodyParser = bodyParser.json();

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
      return;
    }

    var variationPath = path.join(
      variationsBasePath,
      req.params[0].replace('.js', ''),
      req.query.variation
    );

    fs.unlink(variationPath, (err) => {
      if (err) {
        res.status(404).send('');
        return;
      }
      res.status(200).send('');
      return;
    });
  });

  app.post('/*', jsonBodyParser, (req, res) => {
    var componentPath = path.join(componentBasePath, req.params[0]);
    if (fileExists(componentPath) === false) {
      res.status(404).send('');
      return;
    }


    var stringToBeReplaced = req.params[0].endsWith('/index.js') ? '/index.js' : '.js';
    var variationComponentPath = path.join(
      variationsBasePath,
      req.params[0].replace(stringToBeReplaced, '')
    );
    var variationPath = path.join(variationComponentPath, req.body.variation);

    if (!fs.existsSync(variationComponentPath)) {
      fs.mkdirSync(variationComponentPath);
    };

    fs.closeSync(fs.openSync(variationPath, 'w'));
    try {
      var content = 'module.exports = ' + req.body.code;
      fs.writeFileSync(variationPath, content);
    } catch (error) {
      res.status(500).send('');
      return;
    }

    res.status(200).send(`POST`);
  });

  server = app.listen(port);
}

var stop = (callback) => {
  server.close(callback);
}

exports.start = start;
exports.stop = stop;
