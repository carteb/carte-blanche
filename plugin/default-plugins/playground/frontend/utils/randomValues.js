/**
 * randomValues
 *
 * @param  {object} propTypes The propTypes for a component parsed by react-docgen
 * @return {object}           The propTypes with random values based on type
 */

import mapValues from 'lodash/mapValues';

const randomValues = (propTypes) => (
  mapValues(propTypes, (propType) => (
    propType.control.type.randomValue(propType)
  ))
);

export default randomValues;
