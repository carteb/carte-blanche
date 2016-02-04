console.log('Development Environment, mocking components!');

import React from 'react';

window.__STYLEGUIDE_PLUGIN_COMPONENTS_DO_NOT_TOUCH__ = {
  'src/components/button': {
    'name': 'src/components/button',
    'meta': 'This will contain the meta information for /Users/a2517/sites/personal/github/styleguide/examples/simple/src/components/button.js',
    'path': 'src/components/button.js',
    'component': function() {
      return React.createElement(
        'button',
        null,
        'Follow Me'
      );
    }
  }
};

require('./client.js');
