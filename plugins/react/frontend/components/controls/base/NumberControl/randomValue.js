import valueOrNullOrUndefined from '../../../../utils/valueOrNullOrUndefined';

export default (props) => {
  const { required, constraints = {} } = props;
  const canBeNull = !required;
  const canBeUndefined = !required;
  const { min = 0, max = 10000 } = constraints;
  const randomNumber = Math.random() * (max - min) + min;
  return valueOrNullOrUndefined((randomNumber), canBeNull, canBeUndefined);
};
