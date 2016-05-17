import { expect } from 'chai';
import codeToCustomMetadata from '../codeToCustomMetadata';

describe('codeToCustomMetadata', () => {
  it('should convert a number prop', () => {
    const code = `{
  "props": {
    "age": 22
  }
};`;
    const expected = {
      props: {
        age: 22,
      },
    };
    expect(codeToCustomMetadata(code)).to.deep.equal(expected);
  });

  it('should convert an empty object', () => {
    const code = '{};';
    const expected = {};
    expect(codeToCustomMetadata(code)).to.deep.equal(expected);
  });
});
