/**
 * styleguide-plugin.js
 *
 * The plugin is instantiated and the emitted styleguide.html file is
 * generated here.
 */

import fs from 'fs';
import path from 'path';
import ReactPlugin from '../plugins/react/plugin';
import isArray from 'lodash/isArray';
import ExtraEntryWebpackPlugin from 'extra-entry-webpack-plugin';

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
  if (!this.options.include) {
    throw new Error('You need to specify where your components are in the "include" option!\n\n');
  }

  // Assert that the plugins option is an array if specified
  if (this.options.plugins && !isArray(this.options.plugins)) {
    throw new Error('The "plugins" option needs to be an array!\n\n');
  }
}

/**
 * Initializes the plugin, called after the main StyleguidePlugin function above
 */
StyleguidePlugin.prototype.apply = function apply(compiler) {
  const dest = this.options.dest || 'styleguide';

  // Register either the plugins or the default plugins
  if (this.options.plugins && this.options.plugins.length > 0) {
    this.registerPlugins(compiler);
  } else {
    this.registerDefaultPlugins(compiler);
  }

  // Compile the client api
  compiler.apply(new ExtraEntryWebpackPlugin({
    // Load the dynamic resolve loader with a placeholder file
    entry: `!!${require.resolve('./dynamic-resolve.js')}?${
      JSON.stringify({
        filter: this.options.filter.toString(),
        componentRoot: this.options.componentRoot,
        context: compiler.context,
      })}!${require.resolve('./dynamic-resolve.js')}`,
    entryName: `Atrium [${this.id}]`,
    outputName: path.join(dest, 'user-bundle.js'),
  }));

  const styleguideAssets = {
    'index.html': fs.readFileSync(path.resolve(__dirname, './assets/client.html')),
    'client-bundle.js': fs.readFileSync(path.resolve(__dirname, './assets/client-bundle.js')),
    'client-bundle.css': fs.readFileSync(path.resolve(__dirname, './assets/main.css')),
  };

  compiler.plugin('emit', (compilation, callback) => {
    // Emit styleguide assets
    Object.keys(styleguideAssets).forEach((filename) => {
      compilation.assets[path.join(dest, filename)] = { // eslint-disable-line no-param-reassign
        source: () => styleguideAssets[filename],
        size: () => styleguideAssets[filename].length,
      };
    });
    callback();
  });
};

/**
 * Register the default plugins
 */
StyleguidePlugin.prototype.registerDefaultPlugins = function registerDefaultPlugins(compiler) {
  const reactPlugin = new ReactPlugin();
  reactPlugin.apply(compiler);
};

/**
 * Register the custom, user defined plugins
 */
StyleguidePlugin.prototype.registerPlugins = function registerPlugins(compiler) {
  const plugins = this.options.plugins;
  for (let i = 0; i < plugins.length; i++) {
    plugins[i].apply(compiler);
  }
};

export default StyleguidePlugin;
