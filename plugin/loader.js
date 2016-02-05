/**
 * loader.js
 *
 * Every component we want in the styleguide, and only those,
 * will run through this loader
 */

import NodeTemplatePlugin from 'webpack/lib/node/NodeTemplatePlugin';
import NodeTargetPlugin from 'webpack/lib/node/NodeTargetPlugin';
import LibraryTemplatePlugin from 'webpack/lib/LibraryTemplatePlugin';
import SingleEntryPlugin from 'webpack/lib/SingleEntryPlugin';
import LimitChunkCountPlugin from 'webpack/lib/optimize/LimitChunkCountPlugin';
import path from 'path';

module.exports = function styleguideLoader(source) {
  this.cacheable();
  return source;
};

module.exports.pitch = function pitch(request) {
  // Get the path we want the emitted bundle of the component at
  const childFilename = path.join('styleguide-plugin', path.basename(request.replace(/^.+!/, '').replace(/\?.+$/, '')));

  // Save the component to the cache so we have it in the main plugin file
  this._compiler.styleguideCache[parseInt(this.query.substr(1), 10)][request] = childFilename;

  // Compile the component with a childCompiler to the path calculated above
  const publicPath = this._compilation.outputOptions.publicPath;
  const outputOptions = {
    filename: childFilename,
    publicPath,
  };
  const childCompiler = this._compilation.createChildCompiler('styleguide-plugin', outputOptions);

  // '!!' strips all previous loaders, so this makes sure all our components are loaded with
  // the loader in component-loader.js and are piped through the entry.js file
  // TODO How exactly does this work
  const entryPoint = '!!' + require.resolve('./component-loader.js') + '?request=' + encodeURI(request).replace(/\!/g, '%21') + '!' + require.resolve('./entry.js');
  childCompiler.apply(new NodeTemplatePlugin(outputOptions));
  childCompiler.apply(new LibraryTemplatePlugin(null, 'window'));
  childCompiler.apply(new NodeTargetPlugin());
  childCompiler.apply(new SingleEntryPlugin(this.context, entryPoint));
  childCompiler.apply(new LimitChunkCountPlugin({ maxChunks: 1 }));

  // TODO Explain this part, what do subCaches do and why do we need them?
  const subCache = 'subcache ' + __dirname + ' ' + request;
  childCompiler.plugin('compilation', function compile(compilation) {
    if (compilation.cache) {
      if (!compilation.cache[subCache]) {
        compilation.cache[subCache] = {};
      }

      compilation.cache = compilation.cache[subCache];
    }
  });

  const callback = this.async();
  childCompiler.runAsChild(function runAsChild(err, entries, compilation) {
    if (err) {
      return callback(err);
    }

    if (compilation.errors.length > 0) {
      return callback(compilation.errors[0]);
    }

    callback(null);
  });
};
