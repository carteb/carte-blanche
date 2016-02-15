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
};

export default Godzilla;
