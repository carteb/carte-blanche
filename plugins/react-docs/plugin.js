const reactDocs = require('react-docgen');

function ReactDocsPlugin(options) {
  this.options = options || {};
}
/**
 * Initializes the plugin, called after the main CarteBlanche function above
 */
ReactDocsPlugin.prototype.apply = function apply(compiler) {
  compiler.plugin('compilation', (compilation) => {
    // Expose the react parse result to all other carte-blanche plugins
    compilation.plugin(
      'carte-blanche-plugin-before-processing',
      (data) => {
        data.reactDocs = reactDocs.parse(data.source); // eslint-disable-line no-param-reassign
      }
    );
  });
};

export default ReactDocsPlugin;
