function SourcePlugin(options) {
  this.options = options || {};
}
/**
 * Initializes the plugin, called after the main StyleguidePlugin function above
 */
SourcePlugin.prototype.apply = function apply(compiler) {
  const options = this.options;
  compiler.plugin('compilation', (compilation) => {
    // The source styleguide plugin
    compilation.plugin('styleguide-plugin-processing', (renderStyleguide) => {
      renderStyleguide({
        name: 'source',
        frontendData: { options },
        frontendPlugin: `!!babel!${require.resolve('./component.js')}`,
      });
    });
  });
};

export default SourcePlugin;
