/**
 * !!!!!COPIED FROM server/getVariationPathFromComponentPath!!!!!
 */

// Regexes

// TODO make file-ending dynamic
const FILE_ENDING_REGEX = /\.jsx?|\.es6?/gi;
const INDEX_PATH_REGEX = /\/index/gi;

/**
 * Gets the component name from a path
 *
 * @param  {string} path The component path, e.g. /folder/components/Button.js
 * @return {String}      Only the component name, e.g. Button
 */
const getVariationPathFromComponentPath = (relativeComponentPath) => {
  // Step 1: Remove file endinging
  let variationPath = relativeComponentPath.replace(FILE_ENDING_REGEX, '');
  // Step 2: Remove file endings and index files
  const indexPaths = variationPath.match(INDEX_PATH_REGEX);
  if (indexPaths !== null) {
    variationPath = variationPath.replace(INDEX_PATH_REGEX, '');
  }
  return variationPath;
};

export default getVariationPathFromComponentPath;
