import React, { PropTypes } from 'react';
import test from './test-file';
import Button from '../Button';

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
