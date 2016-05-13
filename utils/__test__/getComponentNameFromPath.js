import getComponentNameFromPath from '../getComponentNameFromPath';
import { expect } from 'chai';

describe('getComponentNameFromPath', () => {
  describe('should strip path endings', () => {
    it('should remove .js', () => {
      expect(
        getComponentNameFromPath('Button.js')
      ).to.equal('Button');
    });

    it('should remove .jsx', () => {
      expect(
        getComponentNameFromPath('Button.jsx')
      ).to.equal('Button');
    });

    it('should remove .es6', () => {
      expect(
        getComponentNameFromPath('Button.es6')
      ).to.equal('Button');
    });

    it('should remove .es', () => {
      expect(
        getComponentNameFromPath('Button.es')
      ).to.equal('Button');
    });
  });

  describe('should strip index files and path endings', () => {
    it('should remove /index.js', () => {
      expect(
        getComponentNameFromPath('Button/index.js')
      ).to.equal('Button');
    });

    it('should remove /index.jsx', () => {
      expect(
        getComponentNameFromPath('Button/index.jsx')
      ).to.equal('Button');
    });

    it('should remove /index.es6', () => {
      expect(
        getComponentNameFromPath('Button/index.es6')
      ).to.equal('Button');
    });

    it('should remove /index.es', () => {
      expect(
        getComponentNameFromPath('Button/index.es')
      ).to.equal('Button');
    });
  });

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
