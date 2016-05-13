import { expect } from 'chai';
import variationsToProps from '../variationsToProps';

describe('variationsToProps', () => {
  it('should convert a number prop', () => {
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
    const variation = `{
  props: {
    name: {
      value: 'Ada Lovelace',
    },
  },
};`;
    const expected = {
      name: 'Ada Lovelace',
    };
    expect(variationsToProps(variation)).to.deep.equal(expected);
  });

  it('should convert a true boolean prop', () => {
    const variation = `{
props: {
  active: {
    value: true,
  },
},
};`;
    const expected = {
      active: true,
    };
    expect(variationsToProps(variation)).to.deep.equal(expected);
  });

  it('should convert a false boolean prop', () => {
    const variation =
`{
props: {
  active: {
    value: false,
  },
},
};`;
    const expected = {
      active: false,
    };
    expect(variationsToProps(variation)).to.deep.equal(expected);
  });

  it('should convert multiple props', () => {
    const variation = `{
props: {
  age: {
    value: 22,
  },
  name: {
    value: 'Ada Lovelace',
  },
},
};`;
    const expected = {
      age: 22,
      name: 'Ada Lovelace',
    };
    expect(variationsToProps(variation)).to.deep.equal(expected);
  });
});
