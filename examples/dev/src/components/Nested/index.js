import React, { PropTypes } from 'react';
import styles from './styles';
import Button from '../Button';
import Card from './Card';

const Nested = ({ name }) => (
  <div style={styles.wrapper}>
    {name}
    <Button>test</Button>
    <Card />
  </div>
);

Nested.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Nested;
