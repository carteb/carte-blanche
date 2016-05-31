/**
 * Styleguide Webpack Plugin
 *
 * The plugin is instantiated and the emitted styleguide.html file is
 * generated here.
 */

import apply from './src/apply';
import validateOptions from './src/validateOptions';

/**
 * Instantiates the plugin
 *
 * @param {Object} options           The options
 */
let id = -1;
function StyleguidePlugin(options) {
  // Allow for multiple instances of the plugin
  this.id = (++id);
  // Default and validate the options
  validateOptions(options || {});
  this.options = options;
}

// This method is the meat of our plugin, it does most of the work
StyleguidePlugin.prototype.apply = apply;

export default StyleguidePlugin;
