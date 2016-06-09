function SourcePlugin(options) {
  this.options = options || {};
}
/**
 * Initializes the plugin, called after the main CarteBlanche function above
 */
SourcePlugin.prototype.apply = function apply(compiler) {
  const options = this.options;
  compiler.plugin('compilation', (compilation) => {
    // The source carte-blanche plugin
    compilation.plugin('carte-blanche-plugin-processing', (renderCarteBlanche) => {
      renderCarteBlanche({
        name: 'source',
        frontendData: { options },
        frontendPlugin: `${require.resolve('./component.js')}`,
      });
    });
  });
};

module.exports = SourcePlugin;
