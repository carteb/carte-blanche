import loaderUtils from 'loader-utils';

/**
 * Every component is run through this loader, and the plugins and data specified by
 * plugin developers are properly generated and emitted
 *
 * @param  {String} source The raw, unchanged source code of the component
 */
module.exports = function pluginsLoader(source) {
  // Flag this loader as cacheable to webpack
  this.cacheable();
  const query = loaderUtils.parseQuery(this.query);

  const pluginPromises = [];
  /**
   * Define an api which can be called by the plugins in the
   * carte-blanche-plugin-processing step
   */
  function renderToClient(pluginOptions) {
    // Make the plugin name mandatory
    if (!pluginOptions || !pluginOptions.name) {
      throw new Error('Plugin name is mandatory');
    }

    // Load the frontend data and pass it to the frontend part of the plugin
    pluginPromises.push(new Promise((resolve, reject) => {
      Promise.resolve(pluginOptions.frontendData)
        .then((frontendData) => resolve({
          name: pluginOptions.name,
          frontendData,
          frontendPlugin: pluginOptions.frontendPlugin,
        }))
        .catch((err) => reject(err));
    }));
  }

   // Pass the source code of the component to the plugins
  const pluginData = { source, dest: query.dest, commonsChunkFilename: query.commonsChunkFilename };

  // Trigger events for carte-blanche child plugins
  this._compilation.applyPlugins( // eslint-disable-line no-underscore-dangle
    'carte-blanche-plugin-before-processing',
    pluginData,
    this
  );

  this._compilation.applyPlugins( // eslint-disable-line no-underscore-dangle
    'carte-blanche-plugin-processing',
    renderToClient,
    pluginData,
    this
  );

  // The callback sends webpack the result of this loader. By using this.async(),
  // we tell webpack that this loader will asynchronously return the result.
  // See http://mxs.is/goognh for more information.
  const callback = this.async();
  // Wait for all plugins to be loaded
  Promise.all(pluginPromises)
    .then((plugins) => { // eslint-disable-line arrow-body-style
      // Get the component data from each plugin
      return plugins
        .map((plugin) => {
          // Execute the default export of the plugin frontend module
          const frontendCode = `function() {
            return (require(${JSON.stringify(plugin.frontendPlugin)}))
              .default.apply(
                this,
                Array.prototype.concat.apply([this.frontendData, pluginData], arguments)
              )
          }`;
          // Return the data of the plugin
          return `{
            name: ${JSON.stringify(plugin.name)},
            frontendData: ${JSON.stringify(plugin.frontendData)},
            frontendPlugin: ${plugin.frontendPlugin ? frontendCode : '""'}
          }`;
        });
    })
    // Send the data of all the plugins to the next loader via the callback
    .then((pluginsData) => {
      callback(
        null,
        `
        var pluginData = ${JSON.stringify(pluginData)};
        module.exports = [${pluginsData.join(',')}];
        `
      );
    })
    .catch((err) => callback(err));
};
