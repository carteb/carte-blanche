import React from 'react';

import styles from './styles.css';

const Dropdown = ({ active = false, ...otherProps }) => (
  <div {...otherProps} className={active ? styles.root : styles.hidden} />
);

export default Dropdown;
