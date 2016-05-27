const fork = require('child_process').fork;
const path = require('path');
const reactDocs = require('react-docgen');
const styleguideResolver = require('./resolver.js').default;

function PlaygroundPlugin(options) {
  this.options = options || {};
}
/**
 * Initializes the plugin, called after the main StyleguidePlugin function above
 */
PlaygroundPlugin.prototype.apply = function apply(compiler) {
  // Default options
  const options = {
    hostname: (this.options && this.options.hostname) || 'localhost',
    port: (this.options && this.options.port) || 8000,
  };
  const projectBasePath = compiler.options.context;

  fork(path.resolve(__dirname, './server/run.js'), [
    projectBasePath, // process.argv[2]
    JSON.stringify(options), // process.argv[3]
  ]);

  compiler.plugin('compilation', (compilation) => {
    // Expose the react parse result to all other styleguide plugins
    compilation.plugin(
      'styleguide-plugin-before-processing',
      (data) => {
        // eslint-disable-next-line no-param-reassign
        data.reactDocs = reactDocs.parse(data.source, styleguideResolver);
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
