import { expect } from 'chai';
import sinon from 'sinon';
import SourceLoader from '../source-loader';

describe('SourceLoader', () => {
  let compiler;

  beforeEach(() => {
    compiler = {
      cacheable: sinon.spy(),
      SourceLoader,
    };
  });

  it('should return the source code', () => {
    const source = `export default() => 42;`;
    const expected = 'module.exports = "export default() => 42;"';
    expect(compiler.SourceLoader(source)).to.deep.equal(expected);
    expect(compiler.cacheable).to.have.been.called();
  });
});
