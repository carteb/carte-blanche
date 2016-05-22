import React from 'react';
import Input from '../../../common/Input';

import randomValue from './randomValue';

const NameControl = (props) => {
  const { label, value, onUpdate, isNested } = props;
  return (
    <Input
      value={value}
      type="text"
      isNested={isNested}
      onChange={(data) => onUpdate({ value: data.value })}
      label={label}
      onRandomClick={() => onUpdate({ value: NameControl.randomValue(props) })}
    />
  );
};

NameControl.randomValue = randomValue;

export default NameControl;
