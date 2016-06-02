/**
 * randomValues
 *
 * @param  {object} propTypes The propTypes for a component parsed by react-docgen
 * @return {object}           The propTypes with random values based on type
 */

import mapValues from 'lodash/mapValues';

const randomValues = (propTypesWithControlsAndMetaData) => (
  mapValues(propTypesWithControlsAndMetaData, (propType, key) => {
    const constraints = propTypesWithControlsAndMetaData[key].customMetaData.constraints;
    return propType.control.type.randomValue({
      ...propType,
      constraints,
    });
  })
);

export default randomValues;
