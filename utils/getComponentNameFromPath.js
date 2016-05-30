var getVariationPathFromComponentPath = require('./getVariationPathFromComponentPath');

// Regexes

var PATH_REGEX = /.+\/|.+\\/gi;

/**
 * Gets the component name from a path
 *
 * @param  {string} path The component path, e.g. /folder/components/Button.js
 * @return {String}      Only the component name, e.g. Button
 */
var getComponentNameFromPath = (path) => {
  // Step 1: Get variation path, i.e. remove file endings and index paths
  var variationPath = getVariationPathFromComponentPath(path);
  // Step 2: Remove the prefixed path
  var prefixedPath = variationPath.match(PATH_REGEX);
  if (prefixedPath !== null) {
    variationPath = variationPath.replace(PATH_REGEX, '');
  }
  return variationPath;
};

module.exports = getComponentNameFromPath;
