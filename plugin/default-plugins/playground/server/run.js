/* eslint-disable */

var server = require('./server');
var port = 8000;
var path = require('path');
var projectBasePath = process.argv[2];

// TODO allow to overwrite the path where all the variations data is stored
server.start(projectBasePath, path.join(projectBasePath, 'variations'), port);
console.log('\nPlayground Server listening to port: ' + port + '\n');
