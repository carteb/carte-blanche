import { expect } from 'chai';
import customMetadataToCode from '../customMetadataToCode';

describe('customMetadataToCode', () => {
  it('should convert a number prop', () => {
    const code = {
      props: {
        age: 22,
      },
    };
    const expected = `{
  "props": {
    "age": 22
  }
};`;
    expect(customMetadataToCode(code)).to.deep.equal(expected);
  });

  it('should convert a string prop', () => {
    const code = {
      props: {
        action: 'Random',
      },
    };
    const expected = `{
  "props": {
    "action": "Random"
  }
};`;
    expect(customMetadataToCode(code)).to.deep.equal(expected);
  });

  it('should convert an empty object', () => {
    const code = {};
    const expected = '{};';
    expect(customMetadataToCode(code)).to.deep.equal(expected);
  });
});
