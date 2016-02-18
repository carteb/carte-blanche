const reactDocs = require('react-docgen');
const doctrine = require('doctrine');

module.exports = function metaLoader(source) {
  this.cacheable();

  // Parse React Component for meta information
  const metaInformation = reactDocs.parse(source);
  const docsInformation = doctrine.parse(metaInformation.description);
  const exampleTags = docsInformation.tags.filter((entry) => entry.title === 'example');
  const examples = exampleTags.map((tag) => {
    const wrapperComponent = `
      (Component) => (
        ${tag.description}
      )
    `;
    return wrapperComponent;
  });
  return 'var React = require("react"); module.exports = [' + examples.join(',') + ']';
};
