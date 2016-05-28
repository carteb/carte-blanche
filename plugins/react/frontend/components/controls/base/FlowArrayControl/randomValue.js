import range from 'lodash/range';
import valueOrNullOrUndefined from '../../../../utils/valueOrNullOrUndefined';
import getControl from '../../../../utils/getControl';

export default (props) => {
  const canBeNull = true;
  const canBeUndefined = true;
  const min = 0;
  const max = 4;
  const size = Math.floor(Math.random() * (max - min + 1)) + min;
  const rangeArray = range(min, size);

  // TODO fix this for multiples ones
  const control = getControl(props.elements[0]);

  const value = rangeArray.map(() => control.type.randomValue(props.elements[0]));

  return valueOrNullOrUndefined(value, canBeNull, canBeUndefined);
};
