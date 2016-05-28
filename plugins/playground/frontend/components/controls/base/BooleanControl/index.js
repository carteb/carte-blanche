/**
 * BooleanControl
 *
 * Renders an input which allows you to modify a certain property of type boolean
 */

import React from 'react';
import Select from '../../../common/Select';
import randomValue from './randomValue';

const BooleanControl = (props) => {
  const { label, value, onUpdate, secondaryLabel } = props;
  return (
    <Select
      label={label}
      secondaryLabel={secondaryLabel}
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
      onRandomClick={() => onUpdate({ value: BooleanControl.randomValue(props) })}
    />
  );
};

/**
 * Generates a random boolean value
 */
BooleanControl.randomValue = randomValue;

export default BooleanControl;
