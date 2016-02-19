const reactDocs = require('react-docgen');
const normalize = require('./normalize-meta');

module.exports = function metaLoader(source) {
  this.cacheable();

  // Parse React Component for meta information
  const metaInformation = reactDocs.parse(source);
  const normalizedMetaInformation = normalize(metaInformation);
  return 'module.exports = ' + JSON.stringify(normalizedMetaInformation);
};
