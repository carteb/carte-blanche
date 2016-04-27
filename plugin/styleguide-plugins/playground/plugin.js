function PlaygroundPlugin(options) {
  this.options = options || {};
}
/**
 * Initializes the plugin, called after the main StyleguidePlugin function above
 */
PlaygroundPlugin.prototype.apply = function apply(compiler) {
  const options = this.options;
  compiler.plugin('compilation', (compilation) => {
    // Expose the react parse result to all other styleguide plugins
    compilation.plugin(
      'styleguide-plugin-before-processing',
      function module(data) {
        data.module = 'test';
      }
    );

    // The source styleguide plugin
    compilation.plugin(
      'styleguide-plugin-processing',
      function playgroundRegister(renderStyleguide) {
        renderStyleguide({
          name: 'playground',
          frontendData: { options },
          frontendPlugin: '!!babel!' + require.resolve('./component.js'),
        });
      }
    );
  });
};

export default PlaygroundPlugin;
