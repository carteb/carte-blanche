/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import getBasePath from '../getBasePath';

describe('getBasePath', () => {
  let compiler;

  beforeEach(() => {
    compiler = {
      options: {
        output: {},
      },
    };
  });

  it('should generate basePath out of the publicPath and dest', () => {
    compiler.options.output.publicPath = 'some';
    const result = getBasePath(compiler, { dest: 'space' });
    expect(result).to.equal('/some/space');
  });

  it('should generate basePath out of the publicPath', () => {
    compiler.options.output.publicPath = 'some';
    const result = getBasePath(compiler, {});
    expect(result).to.equal('/some');
  });

  it('should generate basePath out of dest', () => {
    const result = getBasePath(compiler, { dest: 'space' });
    expect(result).to.equal('/space');
  });

  it('should retrun an empty string in case no publicPath or dest provided', () => {
    const result = getBasePath(compiler, {});
    expect(result).to.equal('');
  });
});
