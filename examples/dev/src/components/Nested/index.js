import React, { PropTypes } from 'react';
// import Card from '../Card';
const test = require('./test-file');

const Nested = ({ name }) => (
  <div>
    {name}
  </div>
);

Nested.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Nested;
