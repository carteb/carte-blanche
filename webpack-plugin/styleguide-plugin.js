/**
 * styleguide-plugin.js
 *
 * The plugin is instantiated and the emitted styleguide.html file is
 * generated here.
 */

import fs from 'fs';
import path from 'path';
import ExtraEntryWebpackPlugin from 'extra-entry-webpack-plugin';

import validateOptions from './validateOptions';

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
  // Validate that the options passed in are well formatted
  // Please note that this throws errors and halts execution if not!
  validateOptions(this.options);
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

  // Default the paths of the client files to our own client, set output filenames
  const clientFiles = {
    script: {
      inputPath: './assets/client-bundle.js',
      outputFilename: 'client-bundle.js',
      outputFile: null,
    },
    styles: {
      inputPath: './assets/main.css',
      outputFilename: 'client-bundle.css',
      outputFile: null,
    },
    markup: {
      inputPath: './assets/client.html',
      outputFilename: 'index.html',
      outputFile: null,
    },
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
    Object.keys(clientFiles).forEach((key) => {
      clientFiles[key].inputPath = this.options.client[key] || false;
    });
  }

  // Get the files that make up the client
  Object.keys(clientFiles)
    .filter((key) => clientFiles[key].inputPath !== false)
    .forEach((key) => {
      const absolutePathToFile = path.resolve(basepath, clientFiles[key].inputPath);
      // If fs.readFileSync throws, we assume the file doesn't exist and tell that
      // to the user
      try {
        clientFiles[key].outputFile = fs.readFileSync(absolutePathToFile);
      } catch (err) {
        throw new Error(
          `There is no file at "${absolutePathToFile}", fix your "client.${key}" option!\n\n`
        );
      }
    });

  compiler.plugin('emit', (compilation, callback) => {
    // Emit styleguide assets
    Object.keys(clientFiles)
      // Filter out all the assets that don't access
      .filter((fileType) => clientFiles[fileType].outputFile !== null)
      .forEach((fileType) => {
        // Combine the output filename from the dest option and the filename
        const absoluteOutputFilename = path.join(dest, clientFiles[fileType].outputFilename);
        // Emit the file to webpack
        compilation.assets[absoluteOutputFilename] = { // eslint-disable-line no-param-reassign
          source: () => clientFiles[fileType].outputFile,
          // Webpack needs the size for… something
          size: () => clientFiles[fileType].outputFile.length,
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
