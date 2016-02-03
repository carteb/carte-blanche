import NodeTemplatePlugin from 'webpack/lib/node/NodeTemplatePlugin';
import NodeTargetPlugin from 'webpack/lib/node/NodeTargetPlugin';
import LibraryTemplatePlugin from 'webpack/lib/LibraryTemplatePlugin';
import SingleEntryPlugin from 'webpack/lib/SingleEntryPlugin';
import minimatch from 'minimatch';
import path from 'path';

var id = -1;
function StyleguidePlugin(options) {
  this.id = (++id);
  this.options = options || {};
}

StyleguidePlugin.prototype.getCache = function(compiler) {
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

StyleguidePlugin.prototype.apply = function (compiler) {
  const filename = 'styleguide-bundle.js';
  // Create a cache per instan
  var cache = this.getCache(compiler);

  compiler.plugin('normal-module-factory', (nmf) => {
    nmf.plugin('after-resolve', (data, callback) => {
      if (minimatch(path.relative(compiler.context, data.userRequest), this.options.src)) {
        data.loaders.unshift(require.resolve('./loader.js') + '?' + this.id);
      }
      callback(null, data);
    });
  });

  
  compiler.plugin('emit', (compilation, callback) => {
    var scripts = Object.keys(cache).map(
      (component) => `<script src="${cache[component]}"></script>`
      ).join('\n');

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
      </body>
    </html>
    `;

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
