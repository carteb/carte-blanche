const reactDocs = require('react-docgen');
const component = require('./component');

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
      (data) => {
        data.module = 'test'; // eslint-disable-line no-param-reassign
        data.reactDocs = reactDocs.parse(data.source); // eslint-disable-line no-param-reassign
      }
    );

    // The source styleguide plugin
    compilation.plugin(
      'styleguide-plugin-processing',
      (renderStyleguide, data) => {
        renderStyleguide({
          name: 'playground',
          frontendData: { reactDocs: data.reactDocs, options },
          frontendPlugin: component,
        });
      }
    );
  });
};

export default PlaygroundPlugin;
