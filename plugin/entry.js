'use strict'; // eslint-disable-line strict

// Add out component to window.__STYLEGUIDE_PLUGIN_COMPONENTS_DO_NOT_TOUCH__ so the styleguide client can pick them
// up
window.__STYLEGUIDE_PLUGIN_CLIENT_API.loadComplete('%%path%%', {
  name: '%%name%%',
  meta: require('!!%%metaLoader%%!%%requestPath%%'),
  path: '%%path%%',
  component: (function component() {
    var component = require('!!%%request%%'); // eslint-disable-line
    return component.default || component;
  })(),
});
