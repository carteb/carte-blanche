import { expect } from 'chai';
import variationsToProps from '../variationsToProps';

describe('variationsToProps', () => {
  it.only('should convert a number prop', () => {
    const variation =
`{
  props: {
    age: {
      value: 22,
    },
  },
};`;
    const expected = {
      age: 22,
    };
    expect(variationsToProps(variation)).to.deep.equal(expected);
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
    expect(variationsToProps(props)).to.deep.equal(expected);
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
    expect(variationsToProps(props)).to.deep.equal(expected);
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
    expect(variationsToProps(props)).to.deep.equal(expected);
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
    expect(variationsToProps(props)).to.deep.equal(expected);
  });
});
