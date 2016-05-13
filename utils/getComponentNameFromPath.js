/* eslint-disable no-var, vars-on-top */

// Regexes
var FILE_ENDING_REGEX = /\.jsx?|\.es6?/gi;
var INDEX_PATH_REGEX = /\/index/gi;
var PATH_REGEX = /.+\/|.+\\/gi;

/**
 * Gets the component name from a path
 *
 * @param  {string} path The component path, e.g. /folder/components/Button.js
 * @return {String}      Only the component name, e.g. Button
 */
var getComponentNameFromPath = (path) => {
  // Step 1: Remove file endinging
  var componentName = path.replace(FILE_ENDING_REGEX, '');
  // Step 2: Remove file endings and index files
  var indexPaths = componentName.match(INDEX_PATH_REGEX);
  if (indexPaths !== null) {
    componentName = componentName.replace(INDEX_PATH_REGEX, '');
  }
  // Step 3: Remove the prefixed path
  var prefixedPath = componentName.match(PATH_REGEX);
  if (prefixedPath !== null) {
    componentName = componentName.replace(PATH_REGEX, '');
  }
  return componentName;
};

module.exports = getComponentNameFromPath;
