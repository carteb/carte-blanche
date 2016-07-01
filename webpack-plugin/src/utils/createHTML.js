/* eslint-disable max-len */
import path from 'path';

/**
 * Create the base template, returning a top and a bottom part
 *
 * @param  {String} basePath             The URL carte-blanche should be at
 * @param  {String} commonsChunkFilename The URL of the common chunk
 * @return {Object}          The template split into two parts
 */
const createBaseTemplate = (basePath = '', commonsChunkFilename = '') => {
  const clientBundleJsPath = path.join(basePath, 'client-bundle.js');
  const clientBundleCssPath = path.join(basePath, 'client-bundle.css');
  const userBundleJsPath = path.join(basePath, 'user-bundle.js');
  return {
    top: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>CarteBlanche</title>
    <link rel="stylesheet" type="text/css" href="${clientBundleCssPath}" />
  </head>
  <body>
    <div id='carte-blanche-root'></div>\n`,
    bottom: `${(commonsChunkFilename) ? `    <script src="/${commonsChunkFilename}"></script>` : ''}
    <script src="${clientBundleJsPath}"></script>
    <script src="${userBundleJsPath}"></script>
  </body>
</html>`,
  };
};

/**
 * Create HTML from a base template with injected styles and scripts and the
 * common chunk
 *
 * @param {Object} [options]              The options
 * @param {String} [options.basePath]      The base path of the URL where the bundles are
 * @param {Array}  [options.extraScripts] An array of strings filled with JS code
 * @param {Array}  [options.extraStyles]              --“--               CSS code
 * @param {Array}  [options.commonsChunkFilename] The common chunk filename
 *
 * @return {String}        The finished HTML
 */
const createHtml = (options) => {
  const { basePath, extraScripts, extraStyles, commonsChunkFilename } = options || {};
  const baseTemplate = createBaseTemplate(basePath, commonsChunkFilename);
  // If there's no extraScripts or extraStyles return the basetemplate
  if (!extraScripts && !extraStyles) {
    return `${baseTemplate.top}\n${baseTemplate.bottom}`;
  }

  // Put together the injected content
  let injectedContent = '';
  if (extraScripts) {
    injectedContent += `    <script>${extraScripts.join('\n')}</script>\n`;
  }
  if (extraStyles) {
    injectedContent += `    <style>${extraStyles.join('\n')}</style>\n`;
  }
  return `${baseTemplate.top}${injectedContent}${baseTemplate.bottom}`;
};

export default createHtml;
