import valueOrNullOrUndefined from '../../../../utils/valueOrNullOrUndefined';
import faker from 'faker';

export default ({ required }) => {
  const canBeUndefined = !required;
  const canBeNull = !required;
  return valueOrNullOrUndefined(faker.phone.phoneNumber(), canBeNull, canBeUndefined);
};
