import { expect } from 'chai';
import normalizeMetaInfo from '../frontend/utils/normalizeMetaInfo';

describe('normalizeMetaInfo', () => {
  it('should not remove anything in objects without types', () => {
    const source = {
      description: 'hi',
    };
    const expected = source;
    expect(normalizeMetaInfo(source)).to.deep.equal(expected);
  });

  it('should move name & value from type property into root and remove type', () => {
    const source = {
      type: {
        name: 'age',
        value: 22,
      },
    };
    const expected = {
      name: 'age',
      value: 22,
    };
    expect(normalizeMetaInfo(source)).to.deep.equal(expected);
  });

  it('should move name & value from flowType property into root and remove flowType', () => {
    const source = {
      teeth: {
        flowType: {
          name: 'arrayOf',
          value: {
            name: 'number',
          },
        },
      },
    };
    const expected = {
      teeth: {
        name: 'arrayOf',
        value: {
          name: 'number',
        },
      },
    };
    expect(normalizeMetaInfo(source)).to.deep.equal(expected);
  });

  it('should handle type inside nested objects', () => {
    const source = {
      teeth: {
        type: {
          name: 'arrayOf',
          value: {
            name: 'number',
          },
        },
      },
    };
    const expected = {
      teeth: {
        name: 'arrayOf',
        value: {
          name: 'number',
        },
      },
    };
    expect(normalizeMetaInfo(source)).to.deep.equal(expected);
  });

  it('should handle flowType inside nested objects', () => {
    const source = {
      teeth: {
        flowType: {
          name: 'arrayOf',
          value: {
            name: 'number',
          },
        },
      },
    };
    const expected = {
      teeth: {
        name: 'arrayOf',
        value: {
          name: 'number',
        },
      },
    };
    expect(normalizeMetaInfo(source)).to.deep.equal(expected);
  });

  it('should manage arrays in the type property', () => {
    const source = {
      noseLength: {
        type: {
          name: 'enum',
          value: [
            {
              value: '33',
              computed: false,
            }, {
              value: '42',
              computed: false,
            },
          ],
        },
      },
    };
    const expected = {
      noseLength: {
        name: 'enum',
        value: [
          {
            value: '33',
            computed: false,
          }, {
            value: '42',
            computed: false,
          },
        ],
      },
    };
    expect(normalizeMetaInfo(source)).to.deep.equal(expected);
  });

  it('should make sure a property type is valid', () => {
    const source = {
      type: {
        type: {
          name: 'arrayOf',
          value: {
            name: 'number',
          },
        },
      },
    };
    const expected = {
      type: {
        name: 'arrayOf',
        value: {
          name: 'number',
        },
      },
    };
    expect(normalizeMetaInfo(source)).to.deep.equal(expected);
  });

  it('should make sure a property flowType is valid', () => {
    const source = {
      flowType: {
        type: {
          name: 'arrayOf',
          value: {
            name: 'number',
          },
        },
      },
    };
    const expected = {
      flowType: {
        name: 'arrayOf',
        value: {
          name: 'number',
        },
      },
    };
    expect(normalizeMetaInfo(source)).to.deep.equal(expected);
  });
});
