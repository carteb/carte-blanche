const fork = require('child_process').fork;
const path = require('path');
const reactDocs = require('react-docgen');

function PlaygroundPlugin(options) {
  this.options = options || {};
}
/**
 * Initializes the plugin, called after the main StyleguidePlugin function above
 */
PlaygroundPlugin.prototype.apply = function apply(compiler) {
  const options = this.options;
  const projectBasePath = compiler.options.context;

  fork(path.resolve(__dirname, './server/run.js'), [projectBasePath]);

  compiler.plugin('compilation', (compilation) => {
    // Expose the react parse result to all other styleguide plugins
    compilation.plugin(
      'styleguide-plugin-before-processing',
      (data) => {
        data.reactDocs = reactDocs.parse(data.source);  // eslint-disable-line no-param-reassign
      }
    );

    // The source styleguide plugin
    compilation.plugin(
      'styleguide-plugin-processing',
      (renderStyleguide) => {
        renderStyleguide({
          name: 'playground',
          frontendData: { options },
          frontendPlugin: `${require.resolve('./frontend/index.js')}`,
        });
      }
    );
  });
};

export default PlaygroundPlugin;
