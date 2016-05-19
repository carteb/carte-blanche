/**
 * IntegerControl
 *
 * Renders an input which allows you to modify a certain property of type integer
 */

import React from 'react';
import valueOrNullOrUndefined from '../../../utils/valueOrNullOrUndefined';
import faker from 'faker/build/build/faker';

import Input from '../../common/Input';

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


IntegerControl.ConstraintsForm = (props) => { // eslint-disable-line
  // onChange of any input has to trigger an update on the metadata
  // TODO validate that min is not larger than max
  const { constraints = {} } = props;
  // const updateMin = (min) => {
  //   this.props.onUpdate({});
  // };
  return (
    <div>
      <input
        type="number"
        placeholder="min"
        // update the whole constraints object
        // onChange={ updateMin }
        value={constraints.min}
      />
      <input
        type="number"
        placeholder="max"
        // update the whole constraints object
        // onChange={}
        value={constraints.max}
      />
    </div>
  );
};

export default IntegerControl;
