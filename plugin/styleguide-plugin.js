/**
 * styleguide-plugin.js
 *
 * The plugin is instantiated and the emitted styleguide.html file is
 * generated here.
 */

import minimatch from 'minimatch';
import fs from 'fs';
import path from 'path';
// import ReactDocsPlugin from './default-plugins/react-docs/plugin';
import SourcePlugin from './default-plugins/source/plugin';
import PlaygroundPlugin from './default-plugins/playground/plugin';

let id = -1;
/**
 * Instantiates the plugin
 * @param {Object} options       The options
 * @param {String} options.src   A glob pattern that matches the components that should be display
 * @param {String} options.dest  The destination the styleguide should be emitted at
 */
function StyleguidePlugin(options) {
  this.id = (++id);

  if (!options.src) {
    throw new Error('You need to specify where your components are in the "src" option!\n\n');
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
  this.registerDefaultPlugins(compiler);

  // Create the cache for this instace of the compiler
  const cache = this.getCache(compiler);
  const loaderRequest = `${require.resolve('./loader.js')}?${this.id}`;

  compiler.plugin('normal-module-factory', (nmf) => {
    nmf.plugin('after-resolve', (data, callback) => {
      if (data.loaders.indexOf(loaderRequest) >= 0) {
        return callback(null, data);
      }

      // Load all files hat are matched by the directory glob specified in options.src
      // with the loader in ./loader.js
      // (minimatch checks if a path matches a glob pattern)
      if (minimatch(path.relative(compiler.context, data.userRequest), this.options.src)) {
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
      const clientJs = fs.readFileSync(path.join(__dirname, 'client-bundle.js'));
      compilation.assets['styleguide/client-bundle.js'] = { // eslint-disable-line no-param-reassign
        source: () => clientJs,
        size: () => clientJs.length,
      };
    }

    if (!compilation.assets['styleguide/client-api.js']) {
      const clientJs = fs.readFileSync(path.join(__dirname, 'client-api.js'));
      compilation.assets['styleguide/client-api.js'] = { // eslint-disable-line no-param-reassign
        source: () => clientJs,
        size: () => clientJs.length,
      };
    }

    callback();
  });
};

StyleguidePlugin.prototype.registerDefaultPlugins = function registerDefaultPlugins(compiler) {
  // const reactDocsPlugin = new ReactDocsPlugin();
  // reactDocsPlugin.apply(compiler);
  const sourcePlugin = new SourcePlugin();
  sourcePlugin.apply(compiler);
  const playgroundPlugin = new PlaygroundPlugin();
  playgroundPlugin.apply(compiler);
};

export default StyleguidePlugin;
