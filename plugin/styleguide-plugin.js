/**
 * styleguide-plugin.js
 *
 * The plugin is instantiated and the emitted styleguide.html file is
 * generated here.
 */

import minimatch from 'minimatch';
import fs from 'fs';
import path from 'path';
import PlaygroundPlugin from './default-plugins/playground/plugin';
import some from 'lodash/some';

let id = -1;
/**
 * Instantiates the plugin
 * @param {Object} options           The options
 * @param {String} options.include   A list of glob patterns that matches the components
 * @param {String} options.dest      The destination the styleguide should be emitted at
 */
function StyleguidePlugin(options) {
  this.id = (++id);

  if (!options.include) {
    throw new Error('You need to specify where your components are in the "include" option!\n\n');
  }

  // Assert that a HTML file was specified in the dest option
  if (options.dest && options.dest.indexOf('.html') !== options.dest.length - 5) {
    throw new Error('You need to specify a .html file in the "dest" option!\n\n');
  }

  this.options = options || {};
}

/**
 * Gets the cache of a compiler
 */
StyleguidePlugin.prototype.getCache = function getCache(compiler) {
  // Attach a cache to the compile if not present
  if (!compiler.styleguideCache) {
    compiler.styleguideCache = {}; // eslint-disable-line no-param-reassign
  }

  // Create a cache for this instance
  if (!compiler.styleguideCache[this.id]) {
    compiler.styleguideCache[this.id] = {}; // eslint-disable-line no-param-reassign
  }

  return compiler.styleguideCache[this.id];
};

/**
 * Initializes the plugin, called after the main StyleguidePlugin function above
 */
StyleguidePlugin.prototype.apply = function apply(compiler) {
  if (this.options.plugins && this.options.plugins.length > 0) {
    this.registerPlugins(compiler);
  } else {
    this.registerDefaultPlugins(compiler);
  }

  // Create the cache for this instace of the compiler
  const cache = this.getCache(compiler);
  const loaderRequest = `${require.resolve('./loader.js')}?${this.id}`;

  compiler.plugin('normal-module-factory', (nmf) => {
    nmf.plugin('after-resolve', (data, callback) => {
      // Once the loader is already in loaders bail out and don't inject it again
      if (data.loaders.indexOf(loaderRequest) >= 0) {
        return callback(null, data);
      }

      // Load all files hat are matched by the directory glob specified in
      // options.include with the loader in ./loader.js
      // (minimatch checks if a path matches a glob pattern)
      const matched = some(this.options.include, (pattern) => (
        minimatch(path.relative(compiler.context, data.userRequest), pattern)
      ));
      if (matched) {
        data.loaders.unshift(loaderRequest);
      }

      callback(null, data);
      return undefined;
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
        <link rel="stylesheet" type="text/css" href="/styleguide/playground.css" />
        <script src="/styleguide/client-bundle.js"></script>
        <script src="http://localhost:8080/webpack-dev-server.js"></script>
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
      const clientJs = fs.readFileSync(path.join(__dirname, './build/client-bundle.js'));
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
      const clientCSS = fs.readFileSync(path.join(__dirname, './build/client.css'));
      compilation.assets['styleguide/client.css'] = { // eslint-disable-line no-param-reassign
        source: () => clientCSS,
        size: () => clientCSS.length,
      };
    }

    if (!compilation.assets['styleguide/playground.css']) {
      const playgroundCSS = fs.readFileSync(path.join(__dirname, './build/playground.css'));
      compilation.assets['styleguide/playground.css'] = { // eslint-disable-line no-param-reassign
        source: () => playgroundCSS,
        size: () => playgroundCSS.length,
      };
    }

    callback();
  });
};

/**
 * Register the default plugins
 */
StyleguidePlugin.prototype.registerDefaultPlugins = function registerDefaultPlugins(compiler) {
  const playgroundPlugin = new PlaygroundPlugin();
  playgroundPlugin.apply(compiler);
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
