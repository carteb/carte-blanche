const fork = require('child_process').fork;
const path = require('path');
const reactDocs = require('react-docgen');
const isString = require('lodash/isString');
const isNaN = require('lodash/isNaN');
const styleguideResolver = require('./resolver.js').default;

function PlaygroundPlugin(options) {
  this.options = options || {};

  // The hostname option must be a string
  if (this.options.hostname && !isString(this.options.hostname)) {
    throw new Error('The "hostname" option of the PlaygroundPlugin must be a String!\n\n');
  }

  // The port option must be something that can be made a number
  if (this.options.port && !isNaN(parseFloat(this.options.port))) {
    throw new Error('The "port" option of the PlaygroundPlugin must be a Number!\n\n');
  }

  // The variationFolderName option must be a string
  if (this.options.variationFolderName && !isString(this.options.variationFolderName)) {
    throw new Error('The "variationFolderName" option of the PlaygroundPlugin must be a String!\n\n'); // eslint-disable-line max-len
  }
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
