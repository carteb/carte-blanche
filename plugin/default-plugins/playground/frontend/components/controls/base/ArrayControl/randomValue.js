import range from 'lodash/range';
import valueOrNullOrUndefined from '../../../../utils/valueOrNullOrUndefined';
import getControl from '../../../../utils/getControl';

export default (propTypeData) => {
  const canBeNull = !propTypeData.required;
  const canBeUndefined = !propTypeData.required;
  // Restrict random arrays to a length between 0 and 4 elements
  const min = 0;
  const max = 4;
  const size = Math.floor(Math.random() * (max - min + 1)) + min;
  const rangeArray = range(min, size);
  // Get the prop type data of the insides of the array
  const innerPropTypeData =
    propTypeData.value
    || propTypeData.type
    && propTypeData.type.value; // TODO clean up
  const control = getControl(innerPropTypeData);

  // Generate a random value for each propType in the array
  const value = rangeArray.map(() => control.type.randomValue(innerPropTypeData));

  return valueOrNullOrUndefined(value, canBeNull, canBeUndefined);
};
