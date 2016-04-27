/**
 * FlowUnionControl
 *
 * Renders an information field mentioning that this property can't be generated.
 */

import React, { cloneElement } from 'react';
import valueOrNullOrUndefined from '../utils/valueOrNullOrUndefined';
import getControl from '../utils/getControl';
import RandomButton from '../RandomButton';

const FlowUnionControl = ({ label, propTypeData, value, onUpdate }) => {
  let clonedControl;
  if (typeof value === 'undefined' || value === null) {
    clonedControl = `${value}`;
  } else {
    const currentControl = getControl({ name: (typeof value) });
    const props = {
      label: undefined, // TODO cleanup
      value,
      onUpdate: (data) => onUpdate({ value: data.value }),
    };
    clonedControl = cloneElement(currentControl, props);
  }

  return (
    <div>
      {label}
      <select
        value={ typeof value }
        onChange={ (event) => {
          const newTypeName = event.target.value;
          const control = getControl({ name: newTypeName });
          return onUpdate({ value: control.type.randomValue({}) });
        }}
      >
        { propTypeData.elements.map((type, index) => {
          return (
            <option
              value={ type.name }
              key={ index }
            >
              { type.name }
            </option>
          );
        })}
      </select>
      <RandomButton
        onClick={ () => onUpdate({ value: FlowUnionControl.randomValue(propTypeData) }) }
      />
      { clonedControl }
    </div>
  );
};

FlowUnionControl.randomValue = (propTypeData) => {
  const type = propTypeData.elements[Math.floor(Math.random() * propTypeData.elements.length)];
  const control = getControl(type);
  const value = control.type.randomValue({});
  return valueOrNullOrUndefined(value, true, true);
};

export default FlowUnionControl;
