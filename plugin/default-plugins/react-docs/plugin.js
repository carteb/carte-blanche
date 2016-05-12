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
      (data) => {
        data.reactDocs = reactDocs.parse(data.source); // eslint-disable-line no-param-reassign
      }
    );
  });
};

export default ReactDocsPlugin;
