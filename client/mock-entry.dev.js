/**
 * Mocks the components for easier client developments
 */

console.log('Development Environment, mocking components!');
// Load the components from the example exactly like the plugin would:
require('!!../plugin/component-loader.js?request=babel%21../examples/dev/src/components/button.js!../plugin/entry.js');
require('!!../plugin/component-loader.js?request=babel%21../examples/dev/src/components/card.js!../plugin/entry.js');
require('./client.js');
