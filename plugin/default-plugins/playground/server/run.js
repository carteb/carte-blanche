/* eslint-disable */

var server = require('./server');
var path = require('path');
var projectBasePath = process.argv[2];
var options = (process.argv[3] && JSON.parse(process.argv[3])) || {};

// Default options
var hostname = options.hostname || 'localhost';
var port = options.port || 8000;

// TODO allow to overwrite the path where all the variations data is stored
server.start(projectBasePath, path.join(projectBasePath, 'variations'), {
  hostname: hostname,
  port: port,
});
console.log('\nPlayground Server listening at ' + hostname + ':' + port + '\n');
