import { expect } from 'chai';
import SourceLoader from '../source-loader';

describe('SourceLoader', () => {
  let compiler;

  beforeEach(() => {
    compiler = {
      cacheable: () => null, // TODO add sinon spy once I got internet again
      SourceLoader,
    };
  });

  it('should return the source code', () => {
    const source = `export default() => 42;`;
    const expected = 'module.exports = "export default() => 42;"';
    expect(compiler.SourceLoader(source)).to.deep.equal(expected);
  });
});
