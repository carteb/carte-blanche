/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import duplicateBackslashes from '../duplicateBackslashes';

describe('duplicateBackslashes', () => {
  it('should duplicate every backslash in a string', () => {
    const str = 'c:\\repos\\cartb\\carte-blanche';
    const result = duplicateBackslashes(str);
    expect(result).to.equal('c:\\\\repos\\\\cartb\\\\carte-blanche');
  });

  it('should return an empty string in case no str provided', () => {
    const result = duplicateBackslashes();
    expect(result).to.equal('');
  });
});
