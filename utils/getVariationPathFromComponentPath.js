// Regexes

// TODO make file-ending dynamic
var FILE_ENDING_REGEX = /\.jsx?|\.es6?/gi;
var INDEX_PATH_REGEX = /\/index/gi;

/**
 * Gets the component name from a path
 *
 * @param  {String} path The component path, e.g. /folder/components/Button.js
 * @return {String}      Only the path without the endings, e.g. /folder/components/Button
 */
var getVariationPathFromComponentPath = (relativeComponentPath) => {
  // Step 1: Remove file ending
  var variationPath = relativeComponentPath.replace(FILE_ENDING_REGEX, '');
  // Step 2: Remove file endings and index files
  var indexPaths = variationPath.match(INDEX_PATH_REGEX);
  if (indexPaths !== null) {
    variationPath = variationPath.replace(INDEX_PATH_REGEX, '');
  }
  return variationPath;
};

module.exports = getVariationPathFromComponentPath;
