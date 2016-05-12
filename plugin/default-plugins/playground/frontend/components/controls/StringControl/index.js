import React from 'react';
import valueOrNullOrUndefined from '../../../utils/valueOrNullOrUndefined';
import faker from 'faker/build/build/faker';

import Input from '../../common/Input';

const StringControl = (props) => {
  const { label, value, onUpdate, isNested } = props;
  return (
    <Input
      label={label}
      type="text"
      value={value}
      isNested={isNested}
      onChange={(e) => onUpdate({ value: e.target.value })}
      onRandomClick={() => onUpdate({ value: StringControl.randomValue(props, props.required) })}
    />
  );
};

StringControl.randomValue = (props) => {
  const canBeUndefined = !props.required;
  const canBeNull = !props.required;
  const randomString = faker.lorem.sentence();
  return valueOrNullOrUndefined(randomString, canBeNull, canBeUndefined);
};

export default StringControl;
