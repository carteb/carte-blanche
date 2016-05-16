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
    age: 22,
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
    name: 'Ada Lovelace',
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
    active: true,
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
    active: false,
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
    age: 22,
    name: 'Ada Lovelace',
  },
};`;
    expect(propsToVariation(props)).to.deep.equal(expected);
  });

  it('should convert arrays', () => {
    const props = {
      hairs: [
        1,
        2,
        3,
      ],
    };
    const expected = `{
  props: {
    hairs: [1, 2, 3],
  },
};`;
    expect(propsToVariation(props)).to.deep.equal(expected);
  });

  it('should convert objects', () => {
    const props = {
      hair: {
        length: 15,
        thickness: 7,
      },
    };
    const expected = `{
  props: {
    hair: {
      length: 15,
      thickness: 7,
    },
  },
};`;
    expect(propsToVariation(props)).to.deep.equal(expected);
  });
});
