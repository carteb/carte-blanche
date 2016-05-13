import { expect } from 'chai';
import propsToVariation from '../propsToVariation';

describe('propsToVariation', () => {
  it('should convert a number prop', () => {
    const props = {
      age: 22,
    };
    const expected =
`{
  props: {
    age: {
      value: 22,
    },
  },
};`;
    expect(propsToVariation(props)).to.deep.equal(expected);
  });

  it('should convert a string prop', () => {
    const props = {
      name: 'Ada Lovelace',
    };
    const expected = `{
  props: {
    name: {
      value: 'Ada Lovelace',
    },
  },
};`;
    expect(propsToVariation(props)).to.deep.equal(expected);
  });

  it('should convert a true boolean prop', () => {
    const props = {
      active: true,
    };
    const expected =
`{
  props: {
    active: {
      value: true,
    },
  },
};`;
    expect(propsToVariation(props)).to.deep.equal(expected);
  });

  it('should convert a false boolean prop', () => {
    const props = {
      active: false,
    };
    const expected =
`{
  props: {
    active: {
      value: false,
    },
  },
};`;
    expect(propsToVariation(props)).to.deep.equal(expected);
  });

  it('should convert multiple props', () => {
    const props = {
      age: 22,
      name: 'Ada Lovelace',
    };
    const expected = `{
  props: {
    age: {
      value: 22,
    },
    name: {
      value: 'Ada Lovelace',
    },
  },
};`;
    expect(propsToVariation(props)).to.deep.equal(expected);
  });
});
