/**
 * loader.js
 *
 * Every component we want in the styleguide, and only those,
 * will run through this loader
 */

import NodeTemplatePlugin from 'webpack/lib/node/NodeTemplatePlugin';
import NodeTargetPlugin from 'webpack/lib/node/NodeTargetPlugin';
import LibraryTemplatePlugin from 'webpack/lib/LibraryTemplatePlugin';
import MultiEntryPlugin from 'webpack/lib/MultiEntryPlugin';
import LimitChunkCountPlugin from 'webpack/lib/optimize/LimitChunkCountPlugin';
import path from 'path';

module.exports = function styleguideLoader(source) {
  this.cacheable();
  return source;
};

module.exports.pitch = function pitch(request) {
  // skip loader if in childcompiler
  if (!this._compiler.styleguideCache) {
    return undefined;
  }

  // debugger
  // Get the path we want the emitted bundle of the component at
  // const sanitizedFileName = path.basename(request.replace(/^.+!/, '').replace(/\?.+$/, ''));
  const sanitizedFileName = path.relative(this._compiler.context, request.replace(/^.+!/, ''));
  const childFilename = path.join('styleguide-plugin', sanitizedFileName);

  // Save the component to the cache so we have it in the main plugin file
  const cacheIndex = parseInt(this.query.substr(1), 10);

  debugger
  this._compiler.styleguideCache[cacheIndex][request] = childFilename; // eslint-disable-line

  // Compile the component with a childCompiler to the path calculated above
  const publicPath = this._compilation.outputOptions.publicPath; // eslint-disable-line
  const outputOptions = {
    filename: childFilename,
    publicPath,
  };
  const childCompiler = this._compilation.createChildCompiler( // eslint-disable-line
    'styleguide-plugin',
    outputOptions
  );

  // '!!' strips all previous loaders, so this makes sure all our components are loaded with
  // the loader in component-loader.js and are piped through the entry.js file
  // TODO How exactly does this work
  const requestURI = encodeURI(request).replace(/!/g, '%21');
  const componentLoader = require.resolve('./component-loader.js');
  const entryPoint = `!!${componentLoader}?request=${requestURI}!${require.resolve('./entry.js')}`;
  childCompiler.apply(new NodeTemplatePlugin(outputOptions));
  childCompiler.apply(new LibraryTemplatePlugin(null, 'window'));
  childCompiler.apply(new NodeTargetPlugin());
  childCompiler.apply(new MultiEntryPlugin(this.context, [entryPoint]));
  childCompiler.apply(new LimitChunkCountPlugin({ maxChunks: 1 }));

  // TODO Explain this part, what do subCaches do and why do we need them?
  const subCache = `subcache ${__dirname} ${request}`;
  childCompiler.plugin('compilation', (compilation) => {
    if (compilation.cache) {
      if (!compilation.cache[subCache]) {
        compilation.cache[subCache] = {}; // eslint-disable-line no-param-reassign
      }

      compilation.cache = compilation.cache[subCache]; // eslint-disable-line no-param-reassign
    }
  });

  const callback = this.async();
  childCompiler.runAsChild((err, entries, compilation) => {
    // debugger
    if (err) {
      return callback(err);
    }

    if (compilation.errors.length > 0) {
      return callback(compilation.errors[0]);
    }

    return callback(null);
  });
};
