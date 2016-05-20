import valueOrNullOrUndefined from '../../../utils/valueOrNullOrUndefined';
import faker from 'faker/build/build/faker';

export default (props) => {
  const { constraints, required } = props;
  const canBeNull = !required;
  const canBeUndefined = !required;
  // https://github.com/Marak/faker.js/wiki/Basic-Random-Data
  const randomNumber = faker.random.number(constraints);
  return valueOrNullOrUndefined(randomNumber, canBeNull, canBeUndefined);
};
