import React from 'react';
import Input from '../../../common/Input';

import randomValue from './randomValue';

const DateControl = (props) => {
  const { label, value, onUpdate, isNested } = props;
  return (
    <Input
      value={value}
      type="text"
      isNested={isNested}
      onChange={(data) => onUpdate({ value: data.value })}
      label={label}
      onRandomClick={() => onUpdate({ value: DateControl.randomValue(props) })}
    />
  );
};

DateControl.randomValue = randomValue;

export default DateControl;
