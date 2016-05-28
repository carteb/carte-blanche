/**
 * EnumControl
 *
 * Renders an input which allows you to select one of the enum options.
 */

import React from 'react';
import Select from '../../../common/Select';
import randomValue from './randomValue';

const EnumControl = (props) => {
  const {
    label,
    secondaryLabel,
    value,
    propTypeData,
    onUpdate,
  } = props;
  return (
    <Select
      label={label}
      secondaryLabel={secondaryLabel}
      value={value}
      onChange={(event) => {
        const newValue = event.target.value;
        return onUpdate({ value: newValue });
      }}
      options={propTypeData.value}
      onRandomClick={() => onUpdate({ value: EnumControl.randomValue(propTypeData) })}
    />
  );
};

/**
 * Generates a random boolean value
 */
EnumControl.randomValue = randomValue;

export default EnumControl;
