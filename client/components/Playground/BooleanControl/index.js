import React from 'react';
import { Choice, Toggle } from 'belle';
import RandomButton from '../RandomButton';
import valueOrNullOrUndefined from '../valueOrNullOrUndefined';

const BooleanControl = (props) => {
  const { label, value, onUpdate } = props;
  return (
    <div>
      <label>
        {label}
        <Toggle
          onUpdate={onUpdate}
          value={value}
          style={{ transform: 'scale(0.8)' }}
          firstChoiceStyle={{ fontSize: 13 }}
          secondChoiceStyle={{ fontSize: 13 }}
        >
          <Choice value>True</Choice>
          <Choice value={false}>False</Choice>
        </Toggle>
      </label>
      <RandomButton onClick={ () => onUpdate({ value: BooleanControl.randomValue(props) }) }/>
      {typeof value === 'undefined' ? 'undefined' : null}
      {value === null ? 'null' : null}
    </div>
  );
};

BooleanControl.randomValue = ({ random = {} }) => {
  const {
    canBeNull = true,
    canBeUndefined = true,
  } = random;
  const value = Math.random() >= 0.5;
  return valueOrNullOrUndefined(value, canBeNull, canBeUndefined);
};

export default BooleanControl;
