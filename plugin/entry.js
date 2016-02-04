'use strict';

// Add out component to window.components so the styleguide client can pick them
// up
window.components = window.components || {};
window.components['%%request%%'] = function() {
  return require('!!%%request%%');
};
