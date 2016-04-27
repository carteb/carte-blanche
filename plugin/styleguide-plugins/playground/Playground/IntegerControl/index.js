/**
 * IntegerControl
 *
 * Renders an input which allows you to modify a certain property of type integer
 */

import React from 'react';
import RandomButton from '../RandomButton';
import valueOrNullOrUndefined from '../utils/valueOrNullOrUndefined';

const IntegerControl = (props) => {
  const { label, value, onUpdate } = props;
  return (
    <div>
      <label>
        {label}
        <input
          type="number"
          step="1"
          value={value}
          onChange={(event) => onUpdate({ value: parseInt(event.target.value, 10) })}
        />
      </label>
      <RandomButton onClick={() => onUpdate({ value: IntegerControl.randomValue(props) })} />
      {typeof value === 'undefined' ? 'undefined' : null}
      {value === null ? 'null' : null}
    </div>
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
