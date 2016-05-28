import valueOrNullOrUndefined from '../../../../utils/valueOrNullOrUndefined';

export default (props) => {
  const canBeNull = !props.required;
  const canBeUndefined = !props.required;
  const value = Math.random() >= 0.5;
  return valueOrNullOrUndefined(value, canBeNull, canBeUndefined);
};
