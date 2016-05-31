/**
 * Styleguide Webpack Plugin
 *
 * The plugin is instantiated and the emitted styleguide.html file is
 * generated here.
 */

import apply from './src/apply';

let id = -1;
/**
 * Instantiates the plugin
 *
 * @param {Object} options           The options
 * @param {String} options.include   A list of glob patterns that matches the components
 * @param {String} options.dest      The destination the styleguide should be emitted at
 * @param {Array}  options.plugins   The plugins to use for the project
 */
function StyleguidePlugin(options) {
  this.id = (++id);
  this.options = options || {};

  // Assert that the include option was specified
  if (!this.options.componentRoot) {
    throw new Error(
      'You need to specify where your components are in the "componentRoot" option!\n\n'
    );
  }

  // Assert that the plugins option is an array if specified
  if (this.options.plugins && !Array.isArray(this.options.plugins)) {
    throw new Error('The "plugins" option needs to be an array!\n\n');
  }

  // Assert that the files option is an array if specified
  if (this.options.files && !Array.isArray(this.options.files)) {
    throw new Error('The "files" option needs to be an array!\n\n');
  }

  // Default options
  this.options.dest = this.options.dest || 'styleguide';
  // eslint-disable-next-line max-len
  this.options.filter = this.options.filter || /([A-Z][a-zA-Z]*\/index|[A-Z][a-zA-Z]*)\.(jsx?|es6)$/;
}

// Initializes the plugin, the meat of our plugin
StyleguidePlugin.prototype.apply = apply;

export default StyleguidePlugin;
