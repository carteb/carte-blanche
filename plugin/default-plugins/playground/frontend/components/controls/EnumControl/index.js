/**
 * EnumControl
 *
 * Renders an input which allows you to select one of the enum options.
 */

import React from 'react';
import Select from '../../common/Select';

const EnumControl = (props) => {
  const {
    label,
    value,
    propTypeData,
    onUpdate,
  } = props;
  return (
    <Select
      label={label}
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
EnumControl.randomValue = (propTypeData) => {
  const randomValue = propTypeData.value[Math.floor(Math.random() * propTypeData.value.length)];

  // TODO check for randomValue.computed == true;
  return eval(randomValue.value); // eslint-disable-line no-eval
};

export default EnumControl;
