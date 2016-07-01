/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import createHtml from '../createHtml';

describe('createHtml', () => {
  it('should return the default template if no arguments are specified', () => {
    const expected = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>CarteBlanche</title>
    <link rel="stylesheet" type="text/css" href="client-bundle.css" />
  </head>
  <body>
    <div id='carte-blanche-root'></div>


    <script src="client-bundle.js"></script>
    <script src="user-bundle.js"></script>
  </body>
</html>`;
    expect(createHtml()).to.equal(expected);
  });

  it('should handle the basePath option', () => {
    const basePath = '/examples';
    const expected = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>CarteBlanche</title>
    <link rel="stylesheet" type="text/css" href="/examples/client-bundle.css" />
  </head>
  <body>
    <div id='carte-blanche-root'></div>


    <script src="/examples/client-bundle.js"></script>
    <script src="/examples/user-bundle.js"></script>
  </body>
</html>`;
    expect(createHtml({ basePath })).to.equal(expected);
  });

  it('should inject scripts', () => {
    const extraScripts = ['console.log("Hello World!")'];
    const expected = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>CarteBlanche</title>
    <link rel="stylesheet" type="text/css" href="client-bundle.css" />
  </head>
  <body>
    <div id='carte-blanche-root'></div>
    <script>console.log("Hello World!")</script>

    <script src="client-bundle.js"></script>
    <script src="user-bundle.js"></script>
  </body>
</html>`;
    expect(createHtml({ extraScripts })).to.equal(expected);
  });

  it('should inject styles', () => {
    const extraStyles = ['body { background: red; }'];
    const expected = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>CarteBlanche</title>
    <link rel="stylesheet" type="text/css" href="client-bundle.css" />
  </head>
  <body>
    <div id='carte-blanche-root'></div>
    <style>body { background: red; }</style>

    <script src="client-bundle.js"></script>
    <script src="user-bundle.js"></script>
  </body>
</html>`;
    expect(createHtml({ extraStyles })).to.equal(expected);
  });

  it('should inject the common chunk', () => {
    const commonsChunkFilename = 'commons.js';
    const expected = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>CarteBlanche</title>
    <link rel="stylesheet" type="text/css" href="client-bundle.css" />
  </head>
  <body>
    <div id='carte-blanche-root'></div>

    <script src="/commons.js"></script>
    <script src="client-bundle.js"></script>
    <script src="user-bundle.js"></script>
  </body>
</html>`;
    expect(createHtml({ commonsChunkFilename })).to.equal(expected);
  });
});
