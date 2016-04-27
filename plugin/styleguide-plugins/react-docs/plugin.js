const reactDocs = require('react-docgen');

function ReactDocsPlugin(options) {
  this.options = options || {};
}
/**
 * Initializes the plugin, called after the main StyleguidePlugin function above
 */
ReactDocsPlugin.prototype.apply = function apply(compiler) {
  const options = this.options;
  compiler.plugin('compilation', (compilation) => {
    // Expose the react parse result to all other styleguide plugins
    compilation.plugin(
      'styleguide-plugin-before-processing',
      function reactDocsParse(data) {
        data.reactDocs = reactDocs.parse(data.source);
      }
    );

    // The ng-docs styleguide plugin
    compilation.plugin('styleguide-plugin-processing', function reactDocsRegister(renderStyleguide, data) {
      renderStyleguide({
        name: 'reactDocs',
        frontendData: { reactDocs: data.reactDocs, options },
        frontendPlugin: '!!babel!' + require.resolve('./component.js'),
      });
    });
  });
};

export default ReactDocsPlugin;
