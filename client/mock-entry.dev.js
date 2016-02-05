/**
 * Mocks the components for easier client developments
 */
require('../plugin/client-api.js');
// Create routes exactly like the plugin would
window.__STYLEGUIDE_PLUGIN_CLIENT_API.scripts = {
  '../examples/dev/src/components/button.js':'styleguide-plugin/button.js',
  '../examples/dev/src/components/card.js':'styleguide-plugin/card.js'
};
// Instead of lazy loading the scripts we mock the load function
window.__STYLEGUIDE_PLUGIN_CLIENT_API.load = function(path) {
  // Load the components from the example exactly like the plugin would:
  switch (path) {
    case '../examples/dev/src/components/button.js':
      return require('!!../plugin/component-loader.js?request=babel%21../examples/dev/src/components/button.js!../plugin/entry.js');
    case '../examples/dev/src/components/card.js':
      return require('!!../plugin/component-loader.js?request=babel%21../examples/dev/src/components/card.js!../plugin/entry.js');
    default:
      throw new Error('invalid path');
  }
};

require('./client.js');
