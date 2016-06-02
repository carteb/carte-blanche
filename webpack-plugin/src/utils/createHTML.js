/* eslint-disable max-len */
import path from 'path';

/**
 * Create the base template, returning a top and a bottom part
 *
 * @param  {String} dest The URL carte-blanche should be at
 * @return {Object}      The template split into two parts
 */
const createBaseTemplate = (dest) => ({
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
  bottom: `
    <script src="${(dest) ? `/${path.join(dest, 'client-bundle.js')}` : 'client-bundle.js'}"></script>
    <script src="${(dest) ? `/${path.join(dest, 'user-bundle.js')}` : 'user-bundle.js'}"></script>
  </body>
</html>`,
});

/**
 * Create HTML from a base template with injected styles and scripts
 *
 * @param  {Array} scripts An array of strings filled with JS code
 * @param  {Array} styles              --“--               CSS code
 *
 * @return {String}        The finished HTML
 */
const createHTML = (dest, scripts, styles) => {
  const baseTemplate = createBaseTemplate(dest || '');
  // If there's no scripts or styles return the basetemplate
  if (!scripts && !styles) {
    return `${baseTemplate.top}\n${baseTemplate.bottom}`;
  }

  // Put together the injected content
  let injectedContent = '';
  if (scripts) {
    injectedContent += `    <script>${scripts.join('\n')}</script>\n`;
  }
  if (styles) {
    injectedContent += `    <style>${styles.join('\n')}</style>\n`;
  }
  return `${baseTemplate.top}${injectedContent}${baseTemplate.bottom}`;
};

export default createHTML;
