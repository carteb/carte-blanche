/**
 * IntegerControl
 *
 * Renders an input which allows you to modify a certain property of type integer
 */

import React from 'react';
import valueOrNullOrUndefined from '../../../utils/valueOrNullOrUndefined';

import Input from '../../common/Input';

const IntegerControl = (props) => {
  const { label, value, onUpdate, isNested } = props;
  return (
    <Input
      label={label}
      type="number"
      step="1"
      value={value}
      isNested={isNested}
      onChange={(event) => onUpdate({ value: parseInt(event.target.value, 10) })}
      onRandomClick={() => onUpdate({ value: IntegerControl.randomValue(props, props.required) })}
    />
  );
};

/**
 * Generates a random integer
 */
IntegerControl.randomValue = (props, required) => {
  const {
    min = Number.MAX_SAFE_INTEGER,
    max = Number.MIN_SAFE_INTEGER,
    step = 1,
  } = props;
  const canBeNull = !required;
  const canBeUndefined = !required;
  let number;
  do {
    number = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (number % step === 1);

  return valueOrNullOrUndefined(number, canBeNull, canBeUndefined);
};

export default IntegerControl;
