import getComponentNameFromPath from '../getComponentNameFromPath';
import { expect } from 'chai';

describe('getComponentNameFromPath', () => {
  describe('should strip prefixed paths', () => {
    it('should remove a single folder', () => {
      expect(
        getComponentNameFromPath('some/Component')
      ).to.equal('Component');
    });

    it('should remove two folders', () => {
      expect(
        getComponentNameFromPath('some/folder/Component')
      ).to.equal('Component');
    });

    it('should remove dots', () => {
      expect(
        getComponentNameFromPath('../folder/Component')
      ).to.equal('Component');
    });

    it('should work with backslashes', () => {
      expect(
        getComponentNameFromPath('folder\\Component')
      ).to.equal('Component');
    });
  });
});
