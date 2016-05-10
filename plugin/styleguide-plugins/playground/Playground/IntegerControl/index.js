/**
 * IntegerControl
 *
 * Renders an input which allows you to modify a certain property of type integer
 */

import React from 'react';
import RandomButton from '../RandomButton';
import valueOrNullOrUndefined from '../utils/valueOrNullOrUndefined';

import styles from '../StringControl/styles';

const IntegerControl = (props) => {
  const { label, value, onUpdate } = props;
  return (
    <div>
      <label>
        {(label) ? `${label}="` : null}
        <input
          style={styles.input}
          type="number"
          step="1"
          value={value}
          onChange={(event) => onUpdate({ value: parseInt(event.target.value, 10) })}
        />
        {(label) ? '"' : null}
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
