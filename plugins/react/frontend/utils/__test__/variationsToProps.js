import { expect } from 'chai';
import variationsToProps from '../variationsToProps';

describe('variationsToProps', () => {
  describe('should handle props', () => {
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
          props: {
            age: 22,
          },
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
          props: {
            name: 'Ada Lovelace',
          },
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
          props: {
            active: true,
          },
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
          props: {
            active: false,
          },
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
          props: {
            age: 22,
            name: 'Ada Lovelace',
          },
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
          props: {
            hairs: [1, 2, 3],
          },
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
          props: {
            hairs: [
              [1, 2, 3],
              [2, 3, 4],
            ],
          },
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
          props: {
            hair: {
              length: 15,
              thickness: 7,
            },
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
          props: {
            hair: {
              size: {
                length: 15,
                thickness: 22,
              },
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
          props: {
            hair: {
              size: [15, 22],
            },
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
          props: {
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
        },
      };
      expect(variationsToProps(variations)).to.deep.equal(expected);
    });
  });

  describe('should handle names', () => {
    it('should parse simple names', () => {
      const variations = {
        'variationA.js':
`{
  "name": "Disabled"
};`,
      };
      const expected = {
        'variationA.js': {
          name: 'Disabled',
        },
      };
      expect(variationsToProps(variations)).to.deep.equal(expected);
    });

    it('should parse names with spaces', () => {
      const variations = {
        'variationA.js':
`{
  "name": "Disabled Button"
};`,
      };
      const expected = {
        'variationA.js': {
          name: 'Disabled Button',
        },
      };
      expect(variationsToProps(variations)).to.deep.equal(expected);
    });

    it('should handle names and props in one', () => {
      const variations = {
        variationA:
`{
  "name": "Disabled Button",
  "props": {
    "age": 22
  }
};`,
      };
      const expected = {
        variationA: {
          name: 'Disabled Button',
          props: {
            age: 22,
          },
        },
      };
      expect(variationsToProps(variations)).to.deep.equal(expected);
    });

    it('should handle a function prop', () => {
      const variations = {
        variationA: `{
  "props": {
    "onClick": function onClick() {
        return undefined;
      }
  }
};`,
      };
      expect(variationsToProps(variations).variationA.props.onClick).to.be.an('function');
    });

    it('should handle a nested function prop', () => {
      const variations = {
        variationA: `{
  "props": {
    "hairs": {
      "onClick": function onClick() {
          return undefined;
        }
    }
  }
};`,
      };
      expect(variationsToProps(variations).variationA.props.hairs.onClick).to.be.an('function');
    });
  });

  describe('should properly handle errors', () => {
    it('should handle a parsing error', () => {
      const variations = {
        variationA: `{
  "props": {
    "hairs": undefinedVariable
  }
};`,
      };
      const parsedVariations = variationsToProps(variations);
      expect(parsedVariations.variationA.err).to.exist();
      // 48 = Length of "ReferenceError: …"
      expect(parsedVariations.variationA.err).to.have.length.above(48);
    });

    it('should parse other variations even if parsing error happened', () => {
      const variations = {
        variationA: `{
  "props": {
    "hairs": undefinedVariable
  }
};`,
        variationB: `{
  "props": {
    "hairs": {
      "length": 4
    }
  }
}`,
      };
      const expectedVariationB = {
        props: {
          hairs: {
            length: 4,
          },
        },
      };
      const parsedVariations = variationsToProps(variations);
      expect(parsedVariations.variationA.err).to.exist();
      // 48 = Length of "ReferenceError: …"
      expect(parsedVariations.variationA.err).to.have.length.above(48);
      expect(parsedVariations.variationB).to.deep.equal(expectedVariationB);
    });
  });
});
