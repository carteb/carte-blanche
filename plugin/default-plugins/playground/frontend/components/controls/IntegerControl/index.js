/**
 * IntegerControl
 *
 * Renders an input which allows you to modify a certain property of type integer
 */

import React from 'react';
import valueOrNullOrUndefined from '../../../utils/valueOrNullOrUndefined';
import faker from 'faker/build/build/faker';
import toNumber from 'lodash/toNumber';

import Input from '../../common/Input';

const defaultConstraints = {
  min: 0,
  max: 1000,
};

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
IntegerControl.randomValue = (props) => {
  const { constraints, required } = props;
  const canBeNull = !required;
  const canBeUndefined = !required;
  // https://github.com/Marak/faker.js/wiki/Basic-Random-Data
  const randomNumber = faker.random.number(constraints);
  return valueOrNullOrUndefined(randomNumber, canBeNull, canBeUndefined);
};


IntegerControl.ConstraintsForm = ({ constraints = {}, onUpdate }) => {
  const {
    min = defaultConstraints.min,
    max = defaultConstraints.max,
  } = constraints;

  const updateMin = (evt) => {
    onUpdate({ min: toNumber(evt.target.value) });
  };
  const updateMax = (evt) => {
    onUpdate({ max: toNumber(evt.target.value) });
  };

  return (
    <div>
      <Input
        type="number"
        label="Min"
        onChange={updateMin}
        value={min}
      />
      <Input
        type="number"
        label="Max"
        onChange={updateMax}
        value={max}
      />
    </div>
  );
};

export default IntegerControl;
