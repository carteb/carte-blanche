/* eslint-disable */

var server = require('./server');
var path = require('path');
var projectBasePath = process.argv[2];
var options = JSON.parse(process.argv[3]);

// TODO allow to overwrite the path where all the variations data is stored
server.start(projectBasePath, path.join(projectBasePath, options.variationFolderName), options);
console.log('\nPlayground Server listening at ' + options.hostname + ':' + options.port + '\n');
