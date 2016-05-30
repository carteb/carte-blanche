/**
 * styleguide-plugin.js
 *
 * The plugin is instantiated and the emitted styleguide.html file is
 * generated here.
 */

import fs from 'fs';
import path from 'path';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isPlainObject from 'lodash/isPlainObject';
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
  if (!this.options.componentRoot) {
    throw new Error(
      'You need to specify where your components are in the "componentRoot" option!\n\n'
    );
  }

  // Assert that the client option is properly formatted
  if (this.options.client) {
    // Format the client option if only a string was passed in, assuming it is the
    // path to the markup file that was passed
    if (isString(this.options.client)) {
      this.options.client = {
        markup: this.options.client,
      };
    // If the client option is neither a string nor an object, something is wrong
    } else if (!isPlainObject(this.options.client)) {
      throw new Error(
        'The "client" option needs to be an object!\n\n'
      );
    }

    // The users need to replace the markup of the client if they replace anything
    if (!this.options.client.markup) {
      throw new Error(
        'The "client.markup" option needs to be specified if you want to ' +
        'render a custom client!\n\n'
      );
    }
    // If the client script, styles or markup property is not a string, something is wrong
    if (!isString(this.options.client.markup)) {
      throw new Error('The "client.markup" option needs to be a path to a file as a string!\n\n');
    }
    if (this.options.client.styles && !isString(this.options.client.script)) {
      throw new Error('The "client.script" option needs to be a path to a file as a string!\n\n');
    }
    if (this.options.client.styles && !isString(this.options.client.styles)) {
      throw new Error('The "client.styles" option needs to be a path to a file as a string!\n\n');
    }
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
  const filter = this.options.filter || /([A-Z][a-zA-Z]*\/index|[A-Z][a-zA-Z]*)\.(jsx?|es6)$/;

  // Register either the plugins or the default plugins
  if (this.options.plugins && this.options.plugins.length > 0) {
    this.registerPlugins(compiler);
  } else {
    this.registerDefaultPlugins(compiler);
  }

  // Compile the client api
  const userBundleFileName = path.join(dest, 'user-bundle.js');
  compiler.apply(new ExtraEntryWebpackPlugin({
    // Load the dynamic resolve loader with a placeholder file
    entry: `!!${require.resolve('./dynamic-resolve.js')}?${
      JSON.stringify({
        filter: filter.toString(),
        componentRoot: this.options.componentRoot,
        context: compiler.context,
      })}!${require.resolve('./dynamic-resolve.js')}`,
    entryName: `Atrium [${this.id}]`,
    outputName: userBundleFileName,
  }));

  // Default the paths of the client files to our own client
  const clientFilePaths = {
    script: './assets/client-bundle.js',
    styles: './assets/main.css',
    markup: './assets/client.html',
  };
  // Map the output filenames
  const outputFilename = {
    script: 'client-bundle.js',
    styles: 'client-bundle.css',
    markup: 'index.html',
  };

  // If we're using our default client, use the path of the plugin to find
  // the client files
  let basepath = __dirname;
  if (this.options.client) {
    // Set the basepath to the current working directory when users pass in
    // different files they don't have to make the path absolute in their config
    basepath = process.cwd();
    // Iterate over the paths to the files, setting them either to the option
    // the user passed or to false if none was specified. That way, if the user
    // specifies anything, our client files are completely overriden!
    Object.keys(clientFilePaths).forEach((key) => {
      clientFilePaths[key] = this.options.client[key] || false;
    });
  }
  const styleguideAssets = {};
  // Get the files that make up the client
  Object.keys(clientFilePaths)
    .filter((key) => clientFilePaths[key] !== false)
    .forEach((key) => {
      const absolutePathToFile = path.resolve(basepath, clientFilePaths[key]);
      // If fs.readFileSync throws, we assume the file doesn't exist and tell that
      // to the user
      try {
        styleguideAssets[outputFilename[key]] = fs.readFileSync(absolutePathToFile);
      } catch (err) {
        throw new Error(
          `There is no file at "${absolutePathToFile}", fix your "client.${key}" option!\n\n`
        );
      }
    });

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

  // Don't add the styleguide chunk to html files
  compiler.plugin('compilation', (compilation) =>
    compilation.plugin('html-webpack-plugin-alter-chunks', (chunks) =>
      chunks.filter((chunk) => chunk.files.indexOf(userBundleFileName) === -1)
  ));
};

/**
 * Register the default plugins
 */
StyleguidePlugin.prototype.registerDefaultPlugins = function registerDefaultPlugins(compiler) {
  let ReactPlugin = require('../plugins/react/plugin').default; // eslint-disable-line global-require, max-len
  try {
    const reactPlugin = new ReactPlugin();
    reactPlugin.apply(compiler);
  } catch (err) {
    try {
      ReactPlugin = require('atrium-react-plugin-beta').default; // eslint-disable-line global-require, import/no-unresolved, max-len
      const reactPlugin = new ReactPlugin();
      reactPlugin.apply(compiler);
    } catch (ex) {
      console.log('ERROR Installing default Styleguide plugins failed.', ex); // eslint-disable-line no-console,max-len
    }
  }
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
