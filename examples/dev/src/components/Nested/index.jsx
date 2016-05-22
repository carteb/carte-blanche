import React, { PropTypes } from 'react';
// import Card from '../Card';
const test = require('../../test-file.jsx');
const Button = require('../Button.jsx');

const Nested = ({ name }) => (
  <div>
    {name}
    <Button>test</Button>
  </div>
);

Nested.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Nested;
