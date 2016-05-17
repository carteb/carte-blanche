/* eslint-disable */
var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var cors = require('cors');
var mkdirp = require('mkdirp');
var server;
var jsonBodyParser = bodyParser.json();
var getComponentNameFromPath = require('../../../../utils/getComponentNameFromPath');

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

var getRelativeCompPathFromVariations = (req) => req.params[0].replace(/^\/variations/, '');
var getRelativeCompPathFromComponents = (req) => req.params[0].replace(/^\/components/, '');

var start = (projectBasePath, variationsBasePath, port) => {
  var app = express();
  app.use(cors());

  /**
   * GET Variations
   */
  app.get('/variations/*', (req, res) => {
    var relativeComponentPath = getRelativeCompPathFromVariations(req);
    // Get the path of the component from the base path and the passed in parameter
    var componentPath = path.join(projectBasePath, relativeComponentPath);

    // If no file exists at the component path, bail out early
    if (fileExists(componentPath) === false) {
      res.status(404).send('');
      return;
    }

    var componentName = getComponentNameFromPath(relativeComponentPath);
    var variationComponentPath = path.join(variationsBasePath, componentName);

    if (!fs.existsSync(variationComponentPath)) {
      res.json({ data: {} });
      return;
    };

    var variations = {};
    // Get all the variations of this component
    var fileNames = fs.readdirSync(variationComponentPath);
    var filtedFileNames = fileNames.filter((fileName) => fileName.startsWith('v-'))
    filtedFileNames.map((fileName) => {
      var filePath = path.join(variationComponentPath, fileName);
      // TODO make this async and wait for all files to be finished
      var content = fs.readFileSync(filePath, { encoding: 'utf8' });
      variations[fileName.replace('.js', '')] = content.replace("module.exports = ", '');
    });
    res.json({ data: variations });
  });

  /**
   * DELETE Variation
   */
  app.delete('/variations/*', (req, res) => {
    var relativeComponentPath = getRelativeCompPathFromVariations(req);
    var componentPath = path.join(projectBasePath, relativeComponentPath);
    if (fileExists(componentPath) === false) {
      res.status(404).send('');
      return;
    }

    var componentName = getComponentNameFromPath(relativeComponentPath);
    var variationPath = path.join(
      variationsBasePath,
      componentName,
      `${req.query.variation}.js`
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

  /**
   * POST Variation
   */
  app.post('/variations/*', jsonBodyParser, (req, res) => {
    var relativeComponentPath = getRelativeCompPathFromVariations(req);
    var componentPath = path.join(projectBasePath, relativeComponentPath);
    if (fileExists(componentPath) === false) {
      res.status(404).send('');
      return;
    }

    var componentName = getComponentNameFromPath(relativeComponentPath);
    var variationComponentPath = path.join(variationsBasePath, componentName);
    var variationPath = path.join(variationComponentPath, `${req.body.variation}.js`);

    if (!fs.existsSync(variationComponentPath)) {
      mkdirp.sync(variationComponentPath);
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

  /**
   * GET Component Meta data
   */
  app.get('/components/*', (req, res) => {
    var relativeComponentPath = getRelativeCompPathFromComponents(req);
    // Get the path of the component from the base path and the passed in parameter
    var componentPath = path.join(projectBasePath, relativeComponentPath);

    // If no file exists at the component path, bail out early
    if (fileExists(componentPath) === false) {
      res.status(404).send('');
      return;
    }

    var componentName = getComponentNameFromPath(relativeComponentPath);
    var variationComponentPath = path.join(variationsBasePath, componentName);

    if (!fs.existsSync(variationComponentPath)) {
      res.json({ data: {} });
      return;
    };

    // Get the meta data of this component
    var filePath = path.join(variationComponentPath, 'meta.js');
    var content = fs.readFileSync(filePath, { encoding: 'utf8' });
    res.json({ data: content.replace("module.exports = ", '') });
  });

  /**
   * POST Variation
   */
  app.post('/components/*', jsonBodyParser, (req, res) => {
    var relativeComponentPath = getRelativeCompPathFromComponents(req);
    var componentPath = path.join(projectBasePath, relativeComponentPath);
    if (fileExists(componentPath) === false) {
      res.status(404).send('');
      return;
    }

    var componentName = getComponentNameFromPath(relativeComponentPath);
    var variationComponentPath = path.join(variationsBasePath, componentName);
    var componentMetaPath = path.join(variationComponentPath, 'meta.js');

    if (!fs.existsSync(variationComponentPath)) {
      mkdirp.sync(variationComponentPath);
    };

    fs.closeSync(fs.openSync(componentMetaPath, 'w'));
    try {
      var content = 'module.exports = ' + req.body.code;
      fs.writeFileSync(componentMetaPath, content);
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
