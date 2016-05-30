const fork = require('child_process').fork;
const path = require('path');
const reactDocs = require('react-docgen');
const isString = require('lodash/isString');
const isNaN = require('lodash/isNaN');
const defaults = require('lodash/defaults');
const styleguideResolver = require('./resolver.js').default;

function ReactPlugin(options) {
  // Make sure the plugin was instantiated as a constructor, i.e. new ReactPlugin()
  if (!(this instanceof ReactPlugin)) {
    throw new Error(
      'The ReactPlugin must be instantiated with the "new" keyword, i.e. "new ReactPlugin()"\n\n'
    );
  }

  this.options = options || {};

  // The hostname option must be a string
  if (this.options.hostname && !isString(this.options.hostname)) {
    throw new Error('The "hostname" option of the ReactPlugin must be a string!\n\n');
  }

  const parsedPort = parseFloat(this.options.port);
  // The port option must be something that can be made a number
  if (this.options.port && !isNaN(parsedPort)) {
    throw new Error('The "port" option of the ReactPlugin must be a number!\n\n');
  }

  // If the port can be interpreted as a number, it must be above 0 and below 65535
  if (parsedPort < 0 || parsedPort > 65535) {
    throw new Error('The "port" must be between 0 and 65535 (inc)!\n\n');
  }

  // The variationFolderName option must be a string
  if (this.options.variationFolderName && !isString(this.options.variationFolderName)) {
    throw new Error(
      'The "variationFolderName" option of the ReactPlugin must be a string!\n\n'
    );
  }
}

/**
 * Kill a Node.js process
 */
function killProcess(proc) {
  proc.kill('SIGINT');
  process.exit();
}

/**
 * Initializes the plugin, called after the main StyleguidePlugin function above
 */
ReactPlugin.prototype.apply = function apply(compiler) {
  // Default options
  const options = defaults({}, this.options, {
    hostname: 'localhost',
    // The default port is not really used by a popular service:
    // https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers
    port: 8082,
    variationFolderName: 'variations',
  });
  const projectBasePath = compiler.options.context;
  const variationBasePath = path.join(projectBasePath, options.variationFolderName);
  options.variationBasePath = variationBasePath;

  const server = fork(path.resolve(__dirname, './server/run.js'), [
    projectBasePath, // process.argv[2]
    JSON.stringify(options), // process.argv[3]
  ]);

  // Prevent the process from exiting immediately
  process.stdin.resume();

  // When the plugin exits for any reason, kill the forked Node.js process
  // with the server. (exit = process.exit(), SIGINT = CTRL+C, uncaughtException =
  // error in the code)
  process.on('exit', killProcess.bind(null, server));
  process.on('SIGINT', killProcess.bind(null, server));
  process.on('uncaughtException', killProcess.bind(null, server));

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
      (renderToClient) => {
        renderToClient({
          name: 'react',
          frontendData: { options },
          frontendPlugin: `${require.resolve('./frontend/index.js')}`,
        });
      }
    );
  });
};

export default ReactPlugin;
