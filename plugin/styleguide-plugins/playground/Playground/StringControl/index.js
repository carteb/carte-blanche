import React from 'react';
import valueOrNullOrUndefined from '../utils/valueOrNullOrUndefined';
import faker from 'faker/build/build/faker';

import Input from '../../components/Input';

const StringControl = (props) => {
  const { label, value, onUpdate } = props;
  return (
    <Input
      label={label}
      type="text"
      value={value}
      onChange={(e) => onUpdate({ value: e.target.value })}
      onRandomClick={() => onUpdate({ value: StringControl.randomValue(props) })}
    />
  );
};

StringControl.randomValue = ({ random = {} }) => {
  const {
    canBeNull = true,
    canBeUndefined = true,
  } = random;
  const randomString = faker.lorem.sentence();
  return valueOrNullOrUndefined(randomString, canBeNull, canBeUndefined);
};

export default StringControl;
