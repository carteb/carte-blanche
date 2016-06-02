const topTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>CarteBlanche</title>
    <link rel="stylesheet" type="text/css" href="client-bundle.css" />
  </head>
  <body>
    <div id='carte-blanche-root'></div>\n`;

const bottomTemplate = `
    <script src="client-bundle.js"></script>
    <script src="user-bundle.js"></script>
  </body>
</html>`;

/**
 * Create HTML from a base template with injected styles and scripts
 *
 * @param  {Array} scripts An array of strings filled with JS code
 * @param  {Array} styles              --“--               CSS code
 *
 * @return {String}        The finished HTML
 */
const createHTML = (scripts, styles) => {
  // If there's no scripts or styles return the basetemplate
  if (!scripts && !styles) {
    return `${topTemplate}\n${bottomTemplate}`;
  }

  // Put together the injected content
  let injectedContent = '';
  if (scripts) {
    injectedContent += `    <script>${scripts.join('\n')}</script>\n`;
  }
  if (styles) {
    injectedContent += `    <style>${styles.join('\n')}</style>\n`;
  }
  return `${topTemplate}${injectedContent}${bottomTemplate}`;
};

export default createHTML;
