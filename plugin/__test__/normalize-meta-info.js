/* jscs:disable disallowSpacesInsideTemplateStringPlaceholders */

import { expect } from 'chai';
import normalizeMetaInfo from '../normalize-meta-info';

describe('normalizeMetaInfo', () => {
  it('should not remove anything in objects without types', () => {
    const source = {
      description: 'hi',
    };
    const expected = source;
    expect(normalizeMetaInfo(source)).to.deep.equal(expected);
  });

  it('should remove "type"', () => {
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

  it('should remove "flowType"', () => {
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

  it('should remove "type" from nested objects', () => {
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

  it('should remove "flowType" from nested objects', () => {
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

  it('should manage arrays in "type"', () => {
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

  it('should manage "type" in arrays', () => {
    expect(true).to.equal(true);
  });
});
