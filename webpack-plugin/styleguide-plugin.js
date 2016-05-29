/**
 * styleguide-plugin.js
 *
 * The plugin is instantiated and the emitted styleguide.html file is
 * generated here.
 */

import minimatch from 'minimatch';
import fs from 'fs';
import path from 'path';
import some from 'lodash/some';
import isArray from 'lodash/isArray';

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

  // Assert that a HTML file was specified in the dest option
  if (this.options.dest && this.options.dest.indexOf('.html') !== this.options.dest.length - 5) {
    throw new Error('You need to specify a .html file in the "dest" option!\n\n');
  }

  // Assert that the plugins option is an array if specified
  if (this.options.plugins && !isArray(this.options.plugins)) {
    throw new Error('The "plugins" option needs to be an array!\n\n');
  }
}

/**
 * Gets the cache of a plugin instance from the webpack compiler
 */
StyleguidePlugin.prototype.getCache = function getCache(compiler) {
  // Attach a cache to the compilation if not yet present
  if (!compiler.styleguideCache) {
    compiler.styleguideCache = {}; // eslint-disable-line no-param-reassign
  }

  // Create a cache for this plugin instance if none exists yet
  if (!compiler.styleguideCache[this.id]) {
    compiler.styleguideCache[this.id] = {}; // eslint-disable-line no-param-reassign
  }

  // Return the cache for this plugin instance
  return compiler.styleguideCache[this.id];
};

/**
 * Initializes the plugin, called after the main StyleguidePlugin function above
 */
StyleguidePlugin.prototype.apply = function apply(compiler) {
  // Register either the plugins or the default plugins
  if (this.options.plugins && this.options.plugins.length > 0) {
    this.registerPlugins(compiler);
  } else {
    this.registerDefaultPlugins(compiler);
  }

  // Create the cache for this instace of the compiler
  const cache = this.getCache(compiler);
  // Create the loader request that each component will go through
  const loaderRequest = `${require.resolve('./loader.js')}?${this.id}`;

  compiler.plugin('normal-module-factory', (nmf) => {
    nmf.plugin('after-resolve', (data, callback) => { // eslint-disable-line consistent-return
      // Once the loader is already prefixed don't prefix it again
      if (data.loaders.indexOf(loaderRequest) >= 0) {
        return callback(null, data);
      }

      // Check if the current file matches the directory glob specified in
      // options.include. (minimatch checks if a path matches a glob pattern)
      const matched = some(this.options.include, (pattern) => (
        minimatch(path.relative(compiler.context, data.userRequest), pattern)
      ));
      // If the file matches, load it with the loader in ./loader.js
      if (matched) {
        data.loaders.unshift(loaderRequest);
      }

      callback(null, data);
    });
  });

  compiler.plugin('emit', (compilation, callback) => {
    // Generate a string with a script tag for every component
    const paths = {};
    Object.keys(cache).forEach((request) => {
      const requestPath = request.replace(/^.+!/, '').replace(/\?.+$/, '');
      const relativePath = path.relative(compiler.options.context, requestPath);

      // TODO should be relative not absolute:
      paths[relativePath] = `/${cache[request]}`;
    });

    // TODO add option for hot reloading and identify port automatically
    // Inject the component script tags and the client js into a basic HTML template
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Styleguide</title>
      </head>
      <body>
        <div id='styleguide-root'>Root</div>
        <script src="/styleguide/client-api.js"></script>
        <script>
          window.STYLEGUIDE_PLUGIN_CLIENT_API.scripts = ${JSON.stringify(paths)};
        </script>
        <link rel="stylesheet" type="text/css" href="/styleguide/client.css" />
        <script src="/styleguide/client-bundle.js"></script>
      </body>
    </html>`;
    const styleguidePath = this.options.dest || 'styleguide/index.html';

    // And emit that HTML template as 'styleguide.html'
    compilation.assets[styleguidePath] = { // eslint-disable-line no-param-reassign
      source: () => html,
      size: () => html.length,
    };

    // Add styleguide base javascript
    if (!compilation.assets['styleguide/client-bundle.js']) {
      const clientJs = fs.readFileSync(path.join(__dirname, './client-bundle.js'));
      compilation.assets['styleguide/client-bundle.js'] = { // eslint-disable-line no-param-reassign
        source: () => clientJs,
        size: () => clientJs.length,
      };
    }

    if (!compilation.assets['styleguide/client-api.js']) {
      const clientJs = fs.readFileSync(path.join(__dirname, './client-api.js'));
      compilation.assets['styleguide/client-api.js'] = { // eslint-disable-line no-param-reassign
        source: () => clientJs,
        size: () => clientJs.length,
      };
    }

    if (!compilation.assets['styleguide/client.css']) {
      const clientCSS = fs.readFileSync(path.join(__dirname, './main.css'));
      compilation.assets['styleguide/client.css'] = { // eslint-disable-line no-param-reassign
        source: () => clientCSS,
        size: () => clientCSS.length,
      };
    }

    callback();
  });
};

/**
 * Register the default plugins
 */
StyleguidePlugin.prototype.registerDefaultPlugins = function registerDefaultPlugins(compiler) {
  const ReactPlugin = require('atrium-react-plugin-beta'); // eslint-disable-line global-require
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
