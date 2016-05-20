import getControl from '../../../utils/getControl';
import mapValues from 'lodash/mapValues';
import randomValues from '../../../utils/randomValues';
import valueOrNullOrUndefined from '../../../utils/valueOrNullOrUndefined';

export default (propTypeData) => {
  const canBeNull = !propTypeData.required;
  const canBeUndefined = !propTypeData.required;
  const normalizedPropsWithControls = mapValues(propTypeData.value, (prop) => {
    prop.control = getControl(prop); // eslint-disable-line no-param-reassign
    return prop;
  });
  const value = randomValues(normalizedPropsWithControls);
  return valueOrNullOrUndefined(value, canBeNull, canBeUndefined);
};
