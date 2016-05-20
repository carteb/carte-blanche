import valueOrNullOrUndefined from '../../../utils/valueOrNullOrUndefined';
import randomValues from '../../../utils/randomValues';
import normalizeProps from './normalizeProps';

export default (propTypeData) => {
  const canBeNull = true;
  const canBeUndefined = true;
  const normalizedPropsWithControls = normalizeProps(propTypeData.signature.properties);
  const value = randomValues(normalizedPropsWithControls);
  return valueOrNullOrUndefined(value, canBeNull, canBeUndefined);
};
