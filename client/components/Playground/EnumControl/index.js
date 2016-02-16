/**
 * EnumControl
 *
 * Renders an input which allows you to select one of the enum options.
 */

import React from 'react';
import RandomButton from '../RandomButton';

const EnumControl = (props) => {
  const {
    label,
    value,
    propTypeData,
    onUpdate,
  } = props;
  const valueList = propTypeData.value || propTypeData.type && propTypeData.type.value;
  return (
    <div>
      <label>
        {label}
        <select
          value={ value }
          onChange={ (event) => {
            const newValue = eval(event.target.value); // eslint-disable-line no-eval
            return onUpdate({ value: newValue });
          }}
        >
          { valueList && valueList.map((valueEntry, index) => {
            return (
              <option
                value={
                  eval(valueEntry.value) // eslint-disable-line no-eval
                }
                key={ index }
              >
                { valueEntry.value }
              </option>
            );
          })}
        </select>
      </label>
      <RandomButton onClick={ () => onUpdate({ value: EnumControl.randomValue(propTypeData) }) }/>
    </div>
  );
};

/**
 * Generates a random boolean value
 */
EnumControl.randomValue = (propTypeData) => {
  const valueList = propTypeData.value || propTypeData.type && propTypeData.type.value;
  const randomValue = valueList[Math.floor(Math.random() * valueList.length)];

  // TODO check for randomValue.computed == true;
  return eval(randomValue.value); // eslint-disable-line no-eval
};

export default EnumControl;
