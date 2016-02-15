import React, { PropTypes } from 'react';

const Godzilla = ({ isDangerous = false }) => {
  return (
    <div>
      { isDangerous ? 'Dangerous' : 'Not Dangerous'}
    </div>
  );
};

Godzilla.propTypes = {
  isDangerous: PropTypes.bool,
};

export default Godzilla;
