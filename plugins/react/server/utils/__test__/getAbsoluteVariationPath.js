import getAbsoluteVariationPath from '../getAbsoluteVariationPath';
import { expect } from 'chai';

describe('getAbsoluteVariationPath', () => {
  it('should get the absolute path from the variations base path and the component path', () => {
    const variationsBasePath = '/User/asdf/variations';
    const componentPath = 'src/components/Button.js';

    expect(getAbsoluteVariationPath(variationsBasePath, componentPath)).to.equal(
      '/User/asdf/variations/src/components/Button'
    );
  });

  it('should handle an empy variations base path', () => {
    const variationsBasePath = '';
    const componentPath = 'src/components/Button.js';

    expect(getAbsoluteVariationPath(variationsBasePath, componentPath)).to.equal(
      'src/components/Button'
    );
  });

  it('should handle a relative variations base path', () => {
    const variationsBasePath = 'src/variations';
    const componentPath = 'src/components/Button.js';

    expect(getAbsoluteVariationPath(variationsBasePath, componentPath)).to.equal(
      'src/variations/src/components/Button'
    );
  });

  it('should handle an empy component path', () => {
    const variationsBasePath = '/User/asdf/variations';
    const componentPath = '';

    expect(getAbsoluteVariationPath(variationsBasePath, componentPath)).to.equal(
      '/User/asdf/variations'
    );
  });

  it('should handle an absolute component path', () => {
    const variationsBasePath = '/User/asdf/variations';
    const componentPath = '/src/components/Button.js';

    expect(getAbsoluteVariationPath(variationsBasePath, componentPath)).to.equal(
      '/User/asdf/variations/src/components/Button'
    );
  });
});
