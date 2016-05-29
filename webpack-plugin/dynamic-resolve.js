/* eslint-disable max-len */
import loaderUtils from 'loader-utils';

module.exports = function dynamicResolve() {
  this.cacheable();
  const query = loaderUtils.parseQuery(this.query);
  const filter = query.filter;
  const componentRoot = query.componentRoot;
  const context = query.context;

  const loaderMapping = {
    compiledComponent: '',
    meta: `!!${require.resolve('./loaders/plugins-loader.js')}!`,
    examples: `${require.resolve('./loaders/examples-loader.js')}!`,
  };

  const loaders = Object.keys(loaderMapping);

  // Add dynamics requires for every loaders
  loaders.forEach((loader) => {
    loaderMapping[loader] = `require.context('${loaderMapping[loader]}${context}/${componentRoot}', true, ${filter})`;
  });

  return `
    // Dynamic webpack loading for every loader
    var ressources = {
      ${loaders.map((loader) => `"${loader}":${loaderMapping[loader]}`)},
    };
    // Gather all loader information for every loader
    var components = {};
    ressources['${loaders[0]}'].keys().forEach(function(componentFile) {
     components[componentFile] = {};
     Object.keys(ressources).forEach(function(loader) {
       components[componentFile][loader] = function() {
         return ressources['get' + loader.substr(0, 1).toUpperCase() + loader.substr(1)](componentFile);
       };
     });
    });
    window.$INITIALIZE_COMPONENT_GUI(components);
   `;
};
