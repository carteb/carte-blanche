import valueOrNullOrUndefined from '../../../../utils/valueOrNullOrUndefined';
import faker from 'faker';

export default (props) => {
  const {
    required,
    constraints = {},
  } = props;
  const canBeUndefined = !required;
  const canBeNull = !required;
  let randomString;
  switch (constraints.type) {
    case 'firstOnly':
      randomString = faker.name.firstName();
      break;
    case 'lastOnly':
      randomString = faker.name.lastName();
      break;
    case 'both':
    default:
      randomString = `${faker.name.firstName()} ${faker.name.lastName()}`;
      break;
  }
  return valueOrNullOrUndefined(randomString, canBeNull, canBeUndefined);
};
