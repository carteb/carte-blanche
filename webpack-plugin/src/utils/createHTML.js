/* eslint-disable max-len */
import path from 'path';

/**
 * Create the base template, returning a top and a bottom part
 *
 * @param  {String} dest The URL carte-blanche should be at
 * @return {Object}      The template split into two parts
 */
const createBaseTemplate = (dest, commonsChunkFilename) => ({
  top: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>CarteBlanche</title>
    <link rel="stylesheet" type="text/css" href="${(dest) ? `/${path.join(dest, 'client-bundle.css')}` : 'client-bundle.css'}" />
  </head>
  <body>
    <div id='carte-blanche-root'></div>\n`,
  bottom: `${(commonsChunkFilename) ? `    <script src="/${commonsChunkFilename}"></script>` : ''}
    <script src="${(dest) ? `/${path.join(dest, 'client-bundle.js')}` : 'client-bundle.js'}"></script>
    <script src="${(dest) ? `/${path.join(dest, 'user-bundle.js')}` : 'user-bundle.js'}"></script>
  </body>
</html>`,
});

/**
 * Create HTML from a base template with injected styles and scripts and the
 * common chunk
 *
 * @param {Object} [options]              The options
 * @param {String} [options.dest]         The subfolder where the bundles are
 * @param {Array}  [options.extraScripts] An array of strings filled with JS code
 * @param {Array}  [options.extraStyles]              --“--               CSS code
 * @param {Array}  [options.commonsChunkFilename] The common chunk filename
 *
 * @return {String}        The finished HTML
 */
const createHTML = (options) => {
  const { dest, extraScripts, extraStyles, commonsChunkFilename } = options || {};
  const baseTemplate = createBaseTemplate(dest || '', commonsChunkFilename || '');
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

export default createHTML;
