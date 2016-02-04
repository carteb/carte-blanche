console.log('Development Environment, mocking components!');

import React from 'React';

window.components = {
  'src/components/button.js': function() {
    return require('../examples/simple/src/components/button.js');
  }
};

require('./client.js');
