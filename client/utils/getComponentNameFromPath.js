// Regexes
const FILE_ENDING_REGEX = /\.jsx?|\.es6?/gi;
const INDEX_PATH_REGEX = /\/index/gi;
const PATH_REGEX = /.+\/|.+\\/gi;

/**
 * Gets the component name from a path
 *
 * @param  {string} path The component path, e.g. /folder/components/Button.js
 * @return {String}      Only the component name, e.g. Button
 */
export default function getComponentNameFromPath(path) {
  // Step 1: Remove file endinging
  let componentName = path.replace(FILE_ENDING_REGEX, '');
  // Step 2: Remove file endings and index files
  const indexPaths = componentName.match(INDEX_PATH_REGEX);
  if (indexPaths !== null) {
    componentName = componentName.replace(INDEX_PATH_REGEX, '');
  }
  // Step 3: Remove the prefixed path
  const prefixedPath = componentName.match(PATH_REGEX);
  if (prefixedPath !== null) {
    componentName = componentName.replace(PATH_REGEX, '');
  }
  return componentName;
}
