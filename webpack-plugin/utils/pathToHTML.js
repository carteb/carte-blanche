/**
 * Turns file paths into HTML tags
 *
 * @param  {String} path
 *
 * @return {String}      The HTML tag as a string.
 */
function pathToHTML(path) {
  // JS file
  if (path.substr(-'.js'.length) === '.js') {
    return `<script src="${path}"></script>`;
  } else if (path.substr(-'.css'.length) === '.css') {
    return `<link rel="stylesheet" type="text/css" href="${path}" />`;
  }
  return `<!-- [StyleguidePlugin] No HTML tag found for "${path}". Make sure your file ends with ".js" or ".css"! -->`; // eslint-disable-line max-len
}

export default pathToHTML;
