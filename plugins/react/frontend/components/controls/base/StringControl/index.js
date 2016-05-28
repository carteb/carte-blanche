import React from 'react';
import randomValue from './randomValue';
import Input from '../../../common/Input';

const StringControl = (props) => {
  const { label, value, onUpdate, isNested, secondaryLabel } = props;
  return (
    <Input
      label={label}
      secondaryLabel={secondaryLabel}
      type="text"
      value={value}
      isNested={isNested}
      onChange={(e) => onUpdate({ value: e.target.value })}
      onRandomClick={() => onUpdate({ value: StringControl.randomValue(props) })}
    />
  );
};

StringControl.randomValue = randomValue;

export default StringControl;
