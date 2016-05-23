import { expect } from 'chai';
import addDataToVariation from '../addDataToVariation';

describe('addDataToVariation', () => {
  it('should add simple data to the variation', () => {
    const variation =
`{
  "props": {
    "number": 3
  }
};`;
    const data = {
      name: 'variation1',
    };
    const expected =
`{
  "name": "variation1",
  "props": {
    "number": 3
  }
};`;
    expect(addDataToVariation(variation, data)).to.equal(expected);
  });

  it.only('should add multiple simple data to the variation', () => {
    const variation =
`{
  "props": {
    "number": 3
  }
};`;
    const data = {
      name: 'variation1',
      id: 'v1',
    };
    const expected =
`{
  "id": "v1",
  "name": "variation1",
  "props": {
    "number": 3
  }
};`;
    expect(addDataToVariation(variation, data)).to.equal(expected);
  });
});
