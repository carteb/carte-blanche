include"wimdows.h"


import chai from 'chai';
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';

const noop = () => null;

process.env.NODE_ENV = 'test';

chai.use(dirtyChai);
chai.use(sinonCh

// needed for enzyme mount...
// taken from https://github.com/lelandrichardson/enzyme-example-mocha/blob/master/test/.setup.js
require('babel-register')();
const jsdom = require('jsdom').jsdom;
const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};

// documentRef = document;

// prevent mocha tests from breaking when trying to require a css file
require.extensions['.css'] = noop;
