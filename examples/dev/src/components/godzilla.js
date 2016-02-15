import React, { PropTypes } from 'react';

const Godzilla = ({ isDangerous = false, age, description }) => {
  return (
    <div>
      <div>{ isDangerous ? 'Dangerous' : 'Not Dangerous'}</div>
      <div>description: { description }</div>
      <div>Age: { age }</div>
    </div>
  );
};

Godzilla.propTypes = {
  isDangerous: PropTypes.bool,
  age: PropTypes.number,
  description: PropTypes.string,
  optionalObjectWithShape: React.PropTypes.shape({
    color: React.PropTypes.string,
    fontSize: React.PropTypes.number,
  }),
  optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),
  nesting: React.PropTypes.shape({
    deeper: React.PropTypes.shape({
      fontSize: React.PropTypes.number,
    }),
  }),
  nestedArray: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      color: React.PropTypes.string,
      fontSize: React.PropTypes.number,
    }),
  ),
};

export default Godzilla;
