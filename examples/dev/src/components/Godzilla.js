import React, { PropTypes } from 'react';

const Godzilla = (props) => {
  const {
    isDangerous,
    age,
    description,
    fur,
    teeth,
    nestedArray,
    type,
    noseLength,
  } = props;

  return (
    <div>
      <div>{isDangerous ? 'Dangerous' : 'Not Dangerous'}</div>
      <div>description: {description}</div>
      <div>Age: {age}</div>
      {(fur) ? (
        <div>Fur: Density: {fur.density}</div>
      ) : null}
      <div>array: {teeth}</div>
      <div>
        nestedArray:
        {nestedArray && nestedArray.map((entry, index) => (
          <div key={index} >{entry.color}, {entry.fontSize}</div>
        ))}
      </div>
      <div>type: {type}</div>
      <div>noseLength: {noseLength}</div>
    </div>
  );
};

Godzilla.propTypes = {
  isDangerous: PropTypes.bool.isRequired,
  age: PropTypes.number.isRequired,
  description: PropTypes.string,
  fur: React.PropTypes.shape({
    color: React.PropTypes.string,
    density: React.PropTypes.number,
    hairs: React.PropTypes.shape({
      length: React.PropTypes.number,
    }),
  }).isRequired,
  teeth: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  nestedArray: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      color: React.PropTypes.string,
      fontSize: React.PropTypes.number,
    }),
  ),
  type: PropTypes.oneOf(['cute', 'aggressive', 'shy']),
  noseLength: PropTypes.oneOf([33, 42, 88]),
  noseShape: () => {
    if (false) { // eslint-disable-line no-constant-condition
      return new Error('Validation failed!');
    }

    return undefined;
  },
};

export default Godzilla;
