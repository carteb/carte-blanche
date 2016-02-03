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

module.exports.pitch = function(request) {
  var childFilename = path.join('styleguide-plugin', path.basename(request.replace(/^.+!/, '').replace(/\?.+$/, '')));
  this._compiler.styleguideCache[parseInt(this.query.substr(1), 10)][request] = childFilename;
  var publicPath = this._compilation.outputOptions.publicPath;
  var outputOptions = {
    filename: childFilename,
    publicPath: publicPath
  };
  var childCompiler = this._compilation.createChildCompiler("styleguide-plugin", outputOptions);
  var entryPoint = '!!' + require.resolve('./component-loader.js') + '?request=' + encodeURI(request).replace(/\!/g, '%21') + '!' + require.resolve('./entry.js');
  childCompiler.apply(new NodeTemplatePlugin(outputOptions));
  childCompiler.apply(new LibraryTemplatePlugin(null, "window"));
  childCompiler.apply(new NodeTargetPlugin());
  childCompiler.apply(new SingleEntryPlugin(this.context, entryPoint));
  childCompiler.apply(new LimitChunkCountPlugin({ maxChunks: 1 }));
  var subCache = "subcache " + __dirname + " " + request;
  childCompiler.plugin("compilation", function(compilation) {
    if(compilation.cache) {
      if(!compilation.cache[subCache])
        compilation.cache[subCache] = {};
      compilation.cache = compilation.cache[subCache];
    }
  });
  var callback = this.async();
  childCompiler.runAsChild(function(err, entries, compilation) {
    if(err) return callback(err);

    if(compilation.errors.length > 0) {
      return callback(compilation.errors[0]);
    }
    
    callback(null);
  });

};