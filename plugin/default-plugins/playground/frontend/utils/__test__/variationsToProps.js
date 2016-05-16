import { expect } from 'chai';
import variationsToProps from '../variationsToProps';

describe('variationsToProps', () => {
  it('should convert a number prop', () => {
    const variations = {
      'variationA.js':
`{
  "props": {
    "age": 22
  }
};`,
    };
    const expected = {
      'variationA.js': {
        age: 22,
      },
    };
    expect(variationsToProps(variations)).to.deep.equal(expected);
  });

  it('should convert a string prop', () => {
    const variations = {
      'variationA.js':
`{
  "props": {
    "name": "Ada Lovelace"
  }
};`,
    };
    const expected = {
      'variationA.js': {
        name: 'Ada Lovelace',
      },
    };
    expect(variationsToProps(variations)).to.deep.equal(expected);
  });

  it('should convert a true boolean prop', () => {
    const variations = {
      'variationA.js':
`{
  "props": {
    "active": true
  }
};`,
    };
    const expected = {
      'variationA.js': {
        active: true,
      },
    };
    expect(variationsToProps(variations)).to.deep.equal(expected);
  });

  it('should convert a false boolean prop', () => {
    const variations = {
      'variationA.js':
`{
  "props": {
    "active": false
  }
};`,
    };
    const expected = {
      'variationA.js': {
        active: false,
      },
    };
    expect(variationsToProps(variations)).to.deep.equal(expected);
  });

  it('should convert multiple props', () => {
    const variations = {
      'variationA.js':
`{
  "props": {
    "age": 22,
    "name": "Ada Lovelace"
  }
};`,
    };
    const expected = {
      'variationA.js': {
        age: 22,
        name: 'Ada Lovelace',
      },
    };
    expect(variationsToProps(variations)).to.deep.equal(expected);
  });

  it('should convert arrays', () => {
    const variations = {
      'variationA.js':
`{
"props": {
  "hairs": [
    1,
    2,
    3
  ]
}
};`,
    };
    const expected = {
      'variationA.js': {
        hairs: [1, 2, 3],
      },
    };
    expect(variationsToProps(variations)).to.deep.equal(expected);
  });

  it('should convert nested arrays', () => {
    const variations = {
      'variationA.js':
`{
  "props": {
    "hairs": [
      [
        1,
        2,
        3
      ],
      [
        2,
        3,
        4
      ]
    ]
  }
};`,
    };
    const expected = {
      'variationA.js': {
        hairs: [
          [1, 2, 3],
          [2, 3, 4],
        ],
      },
    };
    expect(variationsToProps(variations)).to.deep.equal(expected);
  });

  it('should convert objects', () => {
    const variations = {
      'variationA.js':
`{
  "props": {
    "hair": {
      "length": 15,
      "thickness": 7
    }
  }
};`,
    };
    const expected = {
      'variationA.js': {
        hair: {
          length: 15,
          thickness: 7,
        },
      },
    };
    expect(variationsToProps(variations)).to.deep.equal(expected);
  });

  it('should convert nested objects', () => {
    const variations = {
      'variationA.js':
`{
  "props": {
    "hair": {
      "size": {
        "length": 15,
        "thickness": 22
      }
    }
  }
};`,
    };
    const expected = {
      'variationA.js': {
        hair: {
          size: {
            length: 15,
            thickness: 22,
          },
        },
      },
    };
    expect(variationsToProps(variations)).to.deep.equal(expected);
  });

  it('should covert object-array nesting', () => {
    const variations = {
      'variationA.js':
`{
  "props": {
    "hair": {
      "size": [
        15,
        22
      ]
    }
  }
};`,
    };
    const expected = {
      'variationA.js': {
        hair: {
          size: [15, 22],
        },
      },
    };
    expect(variationsToProps(variations)).to.deep.equal(expected);
  });

  it('should covert array-object nesting', () => {
    const variations = {
      'variationA.js':
`{
"props": {
  "hairs": [
    {
      "size": 15,
      "thickness": 22
    },
    {
      "size": 16,
      "thickness": 25
    }
  ]
}
};`,
    };
    const expected = {
      'variationA.js': {
        hairs: [
          {
            size: 15,
            thickness: 22,
          }, {
            size: 16,
            thickness: 25,
          },
        ],
      },
    };
    expect(variationsToProps(variations)).to.deep.equal(expected);
  });
});
