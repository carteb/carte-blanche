var getVariationPathFromComponentPath = require('../getVariationPathFromComponentPath');
var expect = require('chai').expect;

describe('getVariationPathFromComponentPath', () => {
  describe('should strip path endings', () => {
    it('should remove .js', () => {
      expect(
        getVariationPathFromComponentPath('Button.js')
      ).to.equal('Button');
    });

    it('should remove .jsx', () => {
      expect(
        getVariationPathFromComponentPath('Button.jsx')
      ).to.equal('Button');
    });

    it('should remove .es6', () => {
      expect(
        getVariationPathFromComponentPath('Button.es6')
      ).to.equal('Button');
    });

    it('should remove .es', () => {
      expect(
        getVariationPathFromComponentPath('Button.es')
      ).to.equal('Button');
    });
  });

  describe('should strip index files and path endings', () => {
    it('should remove /index.js', () => {
      expect(
        getVariationPathFromComponentPath('Button/index.js')
      ).to.equal('Button');
    });

    it('should remove /index.jsx', () => {
      expect(
        getVariationPathFromComponentPath('Button/index.jsx')
      ).to.equal('Button');
    });

    it('should remove /index.es6', () => {
      expect(
        getVariationPathFromComponentPath('Button/index.es6')
      ).to.equal('Button');
    });

    it('should remove /index.es', () => {
      expect(
        getVariationPathFromComponentPath('Button/index.es')
      ).to.equal('Button');
    });
  });
});
