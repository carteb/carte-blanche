import pathToHTML from '../pathToHTML';
import { expect } from 'chai';

describe('pathToHTML', () => {
  it('should convert .js files', () => {
    const path = 'script.js';
    const expected = '<script src="script.js"></script>';
    expect(pathToHTML(path)).to.equal(expected);
  });

  it('should convert .css files', () => {
    const path = 'styles.css';
    const expected = '<link rel="stylesheet" type="text/css" href="styles.css" />';
    expect(pathToHTML(path)).to.equal(expected);
  });

  it('should return a nice error comment for all other files', () => {
    const path = 'notacssorjsfile.html';
    const expected = '<!-- [StyleguidePlugin] No HTML tag found for "notacssorjsfile.html". Make sure your file ends with ".js" or ".css"! -->'; // eslint-disable-line max-len
    expect(pathToHTML(path)).to.equal(expected);
  });
});
