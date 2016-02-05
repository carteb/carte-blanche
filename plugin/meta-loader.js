const reactDocs = require('react-docgen');

module.exports = function metaLoader(source) {
  this.cacheable();

  // Parse React Component for meta information
  const metaInformation = reactDocs.parse(source);
  return 'module.exports = ' + JSON.stringify(metaInformation);
};
