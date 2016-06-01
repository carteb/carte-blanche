import { expect } from 'chai';
import convertMetaDataStructure from '../convertMetaDataStructure';

describe('convertMetaDataStructure', () => {
  it('should convert a arrayOf(number)', () => {
    const customMetaData = {
      controlType: 'arrayOf',
      constraints: {
        controlType: 'number',
      },
    };
    const expected = {
      name: 'arrayOf',
      value: {
        name: 'number',
        value: undefined,
      },
    };
    expect(convertMetaDataStructure(customMetaData)).to.deep.equal(expected);
  });
  it('should convert a shape', () => {
    const customMetaData = {
      controlType: 'shape',
    };
    const expected = {
      name: 'shape',
      value: {
        one: { name: 'string', required: false },
        two: { name: 'number', required: false },
        three: { name: 'integer', required: false },
      },
    };
    expect(convertMetaDataStructure(customMetaData)).to.deep.equal(expected);
  });
  it('should convert a bool', () => {
    const customMetaData = {
      controlType: 'bool',
    };
    const expected = {
      name: 'bool',
      value: undefined,
    };
    expect(convertMetaDataStructure(customMetaData)).to.deep.equal(expected);
  });
  it('should convert a number', () => {
    const customMetaData = {
      controlType: 'bool',
    };
    const expected = {
      name: 'bool',
      value: undefined,
    };
    expect(convertMetaDataStructure(customMetaData)).to.deep.equal(expected);
  });
  it('should convert a custom', () => {
    const customMetaData = {
      controlType: 'custom',
    };
    const expected = {
      name: 'custom',
      value: undefined,
    };
    expect(convertMetaDataStructure(customMetaData)).to.deep.equal(expected);
  });
  it('should convert an enum', () => {
    const customMetaData = {
      controlType: 'enum',
    };
    const expected = {
      name: 'enum',
      value: [
        { value: 1, computed: false },
        { value: 2, computed: false },
        { value: 3, computed: false },
      ],
    };
    expect(convertMetaDataStructure(customMetaData)).to.deep.equal(expected);
  });
  it('should convert a arrayOf(arrayOf(number))', () => {
    const customMetaData = {
      controlType: 'arrayOf',
      constraints: {
        controlType: 'arrayOf',
        constraints: {
          controlType: 'number',
        },
      },
    };
    const expected = {
      name: 'arrayOf',
      value: {
        name: 'arrayOf',
        value: {
          name: 'number',
          value: undefined,
        },
      },
    };
    expect(convertMetaDataStructure(customMetaData)).to.deep.equal(expected);
  });
  it('should convert a arrayOf(arrayOf(shape))', () => {
    const customMetaData = {
      controlType: 'arrayOf',
      constraints: {
        controlType: 'arrayOf',
        constraints: {
          controlType: 'shape',
        },
      },
    };
    const expected = {
      name: 'arrayOf',
      value: {
        name: 'arrayOf',
        value: {
          name: 'shape',
          value: {
            one: { name: 'string', required: false },
            two: { name: 'number', required: false },
            three: { name: 'integer', required: false },
          },
        },
      },
    };
    expect(convertMetaDataStructure(customMetaData)).to.deep.equal(expected);
  });
});
