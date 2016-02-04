/**
 * styleguide-plugin.js
 *
 * The plugin is instantiated and the emitted styleguide.html file is
 * generated here.
 */

import minimatch from 'minimatch';
import fs from 'fs';
import path from 'path';

let id = -1;
/**
 * Instantiates the plugin
 * @param {Object} options      The options
 * @param {String} options.src  A glob pattern that matches all components the styleguide should display
 */
function StyleguidePlugin(options) {
  this.id = (++id);
  this.options = options || {};
}

/**
 * Gets the cache of a compiler
 */
StyleguidePlugin.prototype.getCache = function getCache(compiler) {
  // Attach a cache to the compile if not present
  if (!compiler.styleguideCache) {
    compiler.styleguideCache = {};
  }
  // Create a cache for this instance
  if (!compiler.styleguideCache[this.id]) {
    compiler.styleguideCache[this.id] = {};
  }
  return compiler.styleguideCache[this.id];
};

/**
 * Initializes the plugin, called after the main StyleguidePlugin function above
 */
StyleguidePlugin.prototype.apply = function apply(compiler) {
  // Create the cache for this instace of the compiler
  const cache = this.getCache(compiler);

  compiler.plugin('normal-module-factory', (nmf) => {
    nmf.plugin('after-resolve', (data, callback) => {
      // Load all files hat are matched by the directory glob specified in options.src
      // with the loader in ./loader.js
      // (minimatch checks if a path matches a glob pattern)
      if (minimatch(path.relative(compiler.context, data.userRequest), this.options.src)) {
        data.loaders.unshift(require.resolve('./loader.js') + '?' + this.id);
      }
      callback(null, data);
    });
  });

  compiler.plugin('emit', (compilation, callback) => {
    // Get the bundled Styleguide Client
    const clientJs = fs.readFileSync(path.join(__dirname, 'client-bundle.js'));
    // Generate a string with a script tag for every component
    const scripts =
      Object.keys(cache)
        .map((component) => `<script src="${cache[component]}"></script>`)
        .join('\n');

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
        ${scripts}
        <script>${clientJs}</script>
      </body>
    </html>
    `;

    // And emit that HTML template as 'styleguide.html'
    compilation.assets['styleguide.html'] = {
      source: () => {
        return html;
      },
      size: () => 0,
    };
    callback();
  });
};

export default StyleguidePlugin;
