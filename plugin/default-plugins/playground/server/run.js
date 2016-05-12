/* eslint-disable */

var server = require('./server');
var port = 8000;
// TODO ComponentBasePath, VariationsBasePath
server.start('','', port);
console.log('\n\n--------------------------------------');
console.log('Playground Server listening to port: ' + port);
console.log('---------------------------------------\n\n');
