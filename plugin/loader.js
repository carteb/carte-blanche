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
  const childFilename = path.join('styleguide-plugin', path.basename(request.replace(/^.+!/, '').replace(/\?.+$/, '')));
  this._compiler.styleguideCache[parseInt(this.query.substr(1), 10)][request] = childFilename;
  const publicPath = this._compilation.outputOptions.publicPath;
  const outputOptions = {
    filename: childFilename,
    publicPath: publicPath
  };
  const childCompiler = this._compilation.createChildCompiler('styleguide-plugin', outputOptions);
  const entryPoint = '!!' + require.resolve('./component-loader.js') + '?request=' + encodeURI(request).replace(/\!/g, '%21') + '!' + require.resolve('./entry.js');
  childCompiler.apply(new NodeTemplatePlugin(outputOptions));
  childCompiler.apply(new LibraryTemplatePlugin(null, 'window'));
  childCompiler.apply(new NodeTargetPlugin());
  childCompiler.apply(new SingleEntryPlugin(this.context, entryPoint));
  childCompiler.apply(new LimitChunkCountPlugin({ maxChunks: 1 }));
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
