const reactDocs = require('react-docgen');
const doctrine = require('doctrine');
const babel = require('babel-core');

module.exports = function metaLoader(source) {
  this.cacheable();

  // Parse React Component for meta information
  const metaInformation = reactDocs.parse(source);
  const docsInformation = doctrine.parse(metaInformation.description);
  const exampleTags = docsInformation.tags.filter((entry) => entry.title === 'example');
  const examples = exampleTags.map((tag) => tag.description);
  return 'module.exports = ' + JSON.stringify(examples);
};
