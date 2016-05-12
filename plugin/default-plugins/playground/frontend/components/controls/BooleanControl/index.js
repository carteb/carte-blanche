/**
 * BooleanControl
 *
 * Renders an input which allows you to modify a certain property of type boolean
 */

import React from 'react';
import Select from '../../common/Select';
import valueOrNullOrUndefined from '../../../utils/valueOrNullOrUndefined';

const BooleanControl = (props) => {
  const { label, value, onUpdate } = props;
  return (
    <Select
      label={label}
      onChange={(event) => {
        // Need to eval, because we're getting 'true' and 'false' (strings)
        // instead of true and false (booleans) here
        const newValue = eval(event.target.value); // eslint-disable-line no-eval
        return onUpdate({ value: newValue });
      }}
      value={value}
      options={[
        {
          value: true,
          label: 'true',
        }, {
          value: false,
          label: 'false',
        },
      ]}
      onRandomClick={() => onUpdate({ value: BooleanControl.randomValue(props, props.required) })}
    />
  );
};

/**
 * Generates a random boolean value
 */
BooleanControl.randomValue = (props = {}, required) => {
  const canBeNull = !required;
  const canBeUndefined = !required;
  const value = Math.random() >= 0.5;
  return valueOrNullOrUndefined(value, canBeNull, canBeUndefined);
};

export default BooleanControl;
