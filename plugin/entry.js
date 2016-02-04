'use strict';

// Add out component to window.components so the styleguide client can pick them
// up
window.components = window.components || {};
window.components['%%name%%'] = {
  name: '%%name%%',
  meta: require('!!%%metaLoader%%!%%requestPath%%'),
  component: function() {
    var component = require('!!%%request%%');
    return component.default || component;
  }
};
