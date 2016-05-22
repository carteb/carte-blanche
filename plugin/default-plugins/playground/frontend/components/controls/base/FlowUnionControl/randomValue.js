import valueOrNullOrUndefined from '../../../../utils/valueOrNullOrUndefined';
import getControl from '../../../../utils/getControl';

export default (propTypeData) => {
  const type = propTypeData.elements[Math.floor(Math.random() * propTypeData.elements.length)];
  const control = getControl(type);
  const value = control.type.randomValue({});
  return valueOrNullOrUndefined(value, true, true);
};
