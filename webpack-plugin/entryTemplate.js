'use strict'; // eslint-disable-line strict

// Add our component to window.STYLEGUIDE_PLUGIN_CLIENT_API
// so the styleguide client can pick them up
window.STYLEGUIDE_PLUGIN_CLIENT_API.loadComplete('%%path%%', {
  name: '%%name%%',
  plugins: require('!!%%pluginsLoader%%!%%requestPath%%'), // eslint-disable-line
  path: '%%path%%',
  component: (() => {
    var component = require('!!%%request%%'); // eslint-disable-line
    return component.default || component;
  })(),
});
