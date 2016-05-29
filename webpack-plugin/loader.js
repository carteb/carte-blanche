/* eslint-disable no-underscore-dangle, consistent-return */

import NodeTemplatePlugin from 'webpack/lib/node/NodeTemplatePlugin';
import NodeTargetPlugin from 'webpack/lib/node/NodeTargetPlugin';
import LibraryTemplatePlugin from 'webpack/lib/LibraryTemplatePlugin';
import MultiEntryPlugin from 'webpack/lib/MultiEntryPlugin';
import LimitChunkCountPlugin from 'webpack/lib/optimize/LimitChunkCountPlugin';
import path from 'path';

/**
 * Every component we want in the styleguide, and only those, will run through
 * this loader.
 *
 * @param  {String} source The raw source code of the already transpiled component
 *                         e.g. already run through Babel and React Hot Loader
 */
module.exports = function loader(source) {
  // Flag this loader as cacheable to webpack
  this.cacheable();
  return source;
};

module.exports.pitch = function pitch(request) {
  // skip loader if in childcompiler
  if (!this._compiler.styleguideCache) {
    return undefined;
  }

  // Get the path we want the emitted bundle of the component at
  const sanitizedFileName = path.relative(this._compiler.context, request.replace(/^.+!/, ''));
  const childFilename = path.join('styleguide-plugin', sanitizedFileName);

  // Save the component to the cache so we have it in the main plugin file
  const cacheIndex = parseInt(this.query.substr(1), 10);
  this._compiler.styleguideCache[cacheIndex][request] = childFilename;

  // Tell the child compiler we want our bundle emitted to that path
  const publicPath = this._compilation.outputOptions.publicPath;
  const outputOptions = {
    filename: childFilename,
    publicPath,
  };
  // Compile the component with a childCompiler
  const childCompiler = this._compilation.createChildCompiler(
    'styleguide-plugin',
    outputOptions
  );

  // '!!' strips all previous loaders.
  // This generates an entry point for each of our components based on the template
  // in entryTemplate.js and the date computed in entry-loader.js
  const requestURI = encodeURI(request).replace(/!/g, '%21');
  const entryLoader = require.resolve('./entry-loader.js');
  const entryPoint = `!!${entryLoader}?request=${requestURI}!${require.resolve('./entryTemplate.js')}`; // eslint-disable-line max-len
  // See Notes.md in the root folder for more information about these plugins
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

  // Tell webpack that this loader will finish its stuff async
  const callback = this.async();
  // Run the child compiler
  childCompiler.runAsChild((err, entries, compilation) => {
    // If runAsChild encountered an error, tell webpack about it
    if (err) {
      return callback(err);
    }
    // If the child compiler encountered an error, tell webpack about it
    if (compilation.errors.length > 0) {
      return callback(compilation.errors[0]);
    }
    // Otherwise, tell webpack that everything went fine in this loader
    return callback(null);
  });
};
