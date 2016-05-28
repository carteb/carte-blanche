import valueOrNullOrUndefined from '../../../../utils/valueOrNullOrUndefined';
import faker from 'faker/build/build/faker';

export default (props) => {
  const canBeUndefined = !props.required;
  const canBeNull = !props.required;
  const randomString = faker.image.avatar();
  return valueOrNullOrUndefined(randomString, canBeNull, canBeUndefined);
};
