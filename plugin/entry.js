'use strict';

// Add out component to window.components so the styleguide client can pick them
// up
window.components = window.components || {};
window.components['%%name%%'] = {
  name: '%%name%%',
  meta: require('!!%%metaLoader%%!%%requestPath%%'),
  path: '%%path%%',
  component: (function component() {
    var component = require('!!%%request%%'); // eslint-disable-line
    return component.default || component;
  })()
};
