/* eslint-disable max-len */
import loaderUtils from 'loader-utils';
import path from 'path';

module.exports = function dynamicResolve() {
  this.cacheable();
  const query = loaderUtils.parseQuery(this.query);
  const filter = query.filter;
  // TODO check on windows
  const absoluteComponentRoot = path.resolve(query.context, query.componentRoot);
  const relativeComponentRoot = path.relative(query.context, absoluteComponentRoot);

  const loaderMapping = {
    compiledComponent: '',
    meta: `!!${require.resolve('./loaders/plugins-loader.js')}?basePath="${query.basePath}"&commonsChunkFilename="${query.commonsChunkFilename}"!`,
    examples: `${require.resolve('./loaders/examples-loader.js')}!`,
  };

  const loaders = Object.keys(loaderMapping);

  // Add dynamics requires for every loaders
  loaders.forEach((loader) => {
    loaderMapping[loader] = `require.context('${loaderMapping[loader]}${absoluteComponentRoot}', true, ${filter})`;
  });

  return `
    // Activate hot module replacement
    module.hot && module.hot.accept();
    // Dynamic webpack loading for every loader
    var resources = {
      ${loaders.map((loader) => `"${loader}":${loaderMapping[loader]}`)},
    };
    window.$INITIALIZE_COMPONENT_GUI._ressources = resources;
    // The dynamic component files:
    var componentFiles = resources['${loaders[0]}'].keys();
    // Gather all loader information for every loader
    var components = {};
    componentFiles.forEach(function(componentFile) {
      var relativePath = componentFile.replace(/\.\\//, '${relativeComponentRoot}/');
      components[relativePath] = {};
      Object.keys(resources).forEach(function(loader) {
        components[relativePath]['get' + loader.substr(0, 1).toUpperCase() + loader.substr(1)] = function() {
          return window.$INITIALIZE_COMPONENT_GUI._ressources[loader](componentFile);
        };
      });
    });
    window.$INITIALIZE_COMPONENT_GUI(components);
   `;
};
