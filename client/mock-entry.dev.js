/**
 * Mocks the components for easier client developments
 */
require('../plugin/client-api.js');

// Create routes exactly like the plugin would
window.STYLEGUIDE_PLUGIN_CLIENT_API.scripts = {
  '../examples/dev/src/components/Button.js': 'styleguide-plugin/Button.js',
  '../examples/dev/src/components/Card.js': 'styleguide-plugin/Card.js',
  '../examples/dev/src/components/Godzilla.js': 'styleguide-plugin/Godzilla.js',
  '../examples/dev/src/components/Ghidorah.js': 'styleguide-plugin/Ghidorah.js',
};

// Instead of lazy loading the scripts we mock the load function
window.STYLEGUIDE_PLUGIN_CLIENT_API.load = function load(path) {
  // Load the components from the example exactly like the plugin would:
  switch (path) {
    case '../examples/dev/src/components/Button.js':
      return require('!!../plugin/component-loader.js?request=babel%21../examples/dev/src/components/Button.js!../plugin/entry.js'); // eslint-disable-line
    case '../examples/dev/src/components/Card.js':
      return require('!!../plugin/component-loader.js?request=babel%21../examples/dev/src/components/Card.js!../plugin/entry.js'); // eslint-disable-line
    case '../examples/dev/src/components/Godzilla.js':
      return require('!!../plugin/component-loader.js?request=babel%21../examples/dev/src/components/Godzilla.js!../plugin/entry.js'); // eslint-disable-line
    case '../examples/dev/src/components/Ghidorah.js':
      return require('!!../plugin/component-loader.js?request=babel%21../examples/dev/src/components/Ghidorah.js!../plugin/entry.js'); // eslint-disable-line
    default:
      throw new Error('invalid path');
  }
};

require('./client.js');
