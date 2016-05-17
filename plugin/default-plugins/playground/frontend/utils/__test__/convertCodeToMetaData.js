import { expect } from 'chai';
import convertCodeToMetaData from '../convertCodeToMetaData';

describe('convertCodeToMetaData', () => {
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
    expect(convertCodeToMetaData(code)).to.deep.equal(expected);
  });

  it('should convert an empty object', () => {
    const code = '{};';
    const expected = {};
    expect(convertCodeToMetaData(code)).to.deep.equal(expected);
  });
});
