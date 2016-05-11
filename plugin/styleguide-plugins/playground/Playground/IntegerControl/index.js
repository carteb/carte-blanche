/**
 * IntegerControl
 *
 * Renders an input which allows you to modify a certain property of type integer
 */

import React from 'react';
import valueOrNullOrUndefined from '../utils/valueOrNullOrUndefined';

import Input from '../../components/Input';

const IntegerControl = (props) => {
  const { label, value, onUpdate } = props;
  return (
    <Input
      label={label}
      type="number"
      step="1"
      value={value}
      onChange={(event) => onUpdate({ value: parseInt(event.target.value, 10) })}
      onRandomClick={() => onUpdate({ value: IntegerControl.randomValue(props) })}
    />
  );
};

/**
 * Generates a random integer
 */
IntegerControl.randomValue = ({ random = {} }) => {
  const {
    canBeNull = true,
    canBeUndefined = true,
    min = Number.MAX_SAFE_INTEGER,
    max = Number.MIN_SAFE_INTEGER,
    step = 1,
  } = random;
  let number;
  do {
    number = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (number % step === 1);

  return valueOrNullOrUndefined(number, canBeNull, canBeUndefined);
};

export default IntegerControl;
