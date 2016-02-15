import React from 'react';
import RandomButton from '../RandomButton';
import valueOrNullOrUndefined from '../valueOrNullOrUndefined';
import faker from 'faker';

const StringControl = (props) => {
  const { label, value, onUpdate } = props;
  return (
    <div>
      <label>
        {label}
        <input
          type="text"
          value={value}
          onChange={(event) => onUpdate({ value: event.target.value })}
        />
      </label>
      <RandomButton onClick={ () => onUpdate({ value: StringControl.randomValue(props) }) }/>
      {typeof value === 'undefined' ? 'undefined' : null}
      {value === null ? 'null' : null}
    </div>
  );
};

StringControl.randomValue = ({ random = {} }) => {
  const {
    canBeNull = true,
    canBeUndefined = true,
  } = random;
  const randomString = faker.lorem.sentence();
  return valueOrNullOrUndefined(randomString, canBeNull, canBeUndefined);
};

export default StringControl;
