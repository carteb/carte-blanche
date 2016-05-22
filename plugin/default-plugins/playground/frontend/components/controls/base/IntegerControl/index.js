/**
 * IntegerControl
 *
 * Renders an input which allows you to modify a certain property of type integer
 */

import React from 'react';
import ConstraintsForm from './ConstraintsForm';
import randomValue from './randomValue';
import Input from '../../../common/Input';

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
      onRandomClick={() => onUpdate({ value: IntegerControl.randomValue(props) })}
    />
  );
};

/**
 * Generates a random integer
 */
IntegerControl.randomValue = randomValue;

IntegerControl.ConstraintsForm = ConstraintsForm;

export default IntegerControl;
