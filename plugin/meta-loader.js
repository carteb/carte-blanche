const reactDocs = require('react-docgen');
const normalizeMetaInfo = require('./normalize-meta-info');

module.exports = function metaLoader(source) {
  this.cacheable();

  // Parse React Component for meta information
  const metaInformation = reactDocs.parse(source);
  const normalizedMetaInformation = normalizeMetaInfo(metaInformation);
  return 'module.exports = ' + JSON.stringify(normalizedMetaInformation);
};
