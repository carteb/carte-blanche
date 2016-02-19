/* jscs:disable disallowSpacesInsideTemplateStringPlaceholders */

import { expect } from 'chai';
import normalizeMetaInfo from '../normalize-meta-info';

describe('normalizeMetaInfo', () => {
  it('should change the flowType to type', () => {
    const source = {
      type: {
        name: 'age',
        value: 22,
      },
    };
    const expected = {
      type: {
        name: 'age',
        value: 22,
      },
      name: 'age',
      value: 22,
    };
    expect(normalizeMetaInfo(source)).to.deep.equal(expected);
  });

  it('should manage nested data', () => {
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
        type: {
          name: 'arrayOf',
          value: {
            name: 'number',
          },
        },
        name: 'arrayOf',
        value: {
          name: 'number',
        },
      },
    };
    expect(normalizeMetaInfo(source)).to.deep.equal(expected);
  });

  it('should manage arrays', () => {
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

  it('should take name & value from flowType', () => {
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
        flowType: {
          name: 'arrayOf',
          value: {
            name: 'number',
          },
        },
        name: 'arrayOf',
        value: {
          name: 'number',
        },
      },
    };
    expect(normalizeMetaInfo(source)).to.deep.equal(expected);
  });
});
