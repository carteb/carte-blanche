import React from 'react';
import RandomButton from '../RandomButton';
import valueOrNullOrUndefined from '../utils/valueOrNullOrUndefined';
import faker from 'faker/build/build/faker';
import styles from './styles';

const StringControl = (props) => {
  const { label, value, onUpdate } = props;
  return (
    <div>
      <label>
        {(label) ? `${label}="` : null}
        <input
          style={styles.input}
          type="text"
          value={value}
          onChange={(event) => onUpdate({ value: event.target.value })}
        />
        {(label) ? '"' : null},
      </label>
      <RandomButton onClick={() => onUpdate({ value: StringControl.randomValue(props) })} />
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
