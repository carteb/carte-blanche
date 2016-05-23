import React, { PropTypes } from 'react';
import styles from './styles';
import Button from '../Button';

const Nested = ({ name }) => (
  <div style={styles.border}>
    {name}
    <Button>test</Button>
  </div>
);

Nested.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Nested;
