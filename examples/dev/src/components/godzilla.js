import React, { PropTypes } from 'react';

const Godzilla = ({ isDangerous = false, age }) => {
  return (
    <div>
      { isDangerous ? 'Dangerous' : 'Not Dangerous'}
      { age }
    </div>
  );
};

Godzilla.propTypes = {
  isDangerous: PropTypes.bool,
  age: PropTypes.number,
};

export default Godzilla;
