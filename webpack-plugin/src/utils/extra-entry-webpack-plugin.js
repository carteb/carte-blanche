/* eslint-disable */

'use strict';
var MultiEntryPlugin = require('webpack/lib/MultiEntryPlugin');
var SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');

function ExtraEntryWebpackPlugin (options) {
  this.options = {
    entryName: options.entryName,
    entry: options.entry,
    outputName: options.outputName,
    context: options.context
  };
}

ExtraEntryWebpackPlugin.prototype.apply = function (compiler) {
  var entry = this.options.entry;
  var context = this.options.context || this.context;
  var outputName = this.options.outputName;
  var entryName = this.options.entryName || 'extra-entry for "' + outputName + '"';

  var EntryPlugin = Array.isArray(entry) ? MultiEntryPlugin : SingleEntryPlugin;

  // Inject entry into the main compilation
  compiler.apply(new EntryPlugin(
      context,
      entry,
      entryName
  ));

  // Output configuration of the injected entry
  compiler.plugin('compilation', function (compilation) {
    var mainFile = compilation.outputOptions.filename || 'bundle.js';
    compilation
        .mainTemplate
        .plugin('asset-path', function (name, data) {
          if (name !== mainFile) {
            return name;
          }
          return (data.chunk && data.chunk.name === entryName) ? outputName : name;
        });
  });
};

module.exports = ExtraEntryWebpackPlugin;
