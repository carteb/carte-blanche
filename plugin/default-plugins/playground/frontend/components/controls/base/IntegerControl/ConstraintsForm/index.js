import React from 'react';
import toNumber from 'lodash/toNumber';
import Input from '../../../common/Input';

const defaultConstraints = {
  min: 0,
  max: 1000,
};

export default ({ constraints = {}, onUpdate }) => {
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
