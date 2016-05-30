import React from 'react';

import styles from './styles.css';

const InputGroup = ({ className, ...otherProps }) => (
  <div {...otherProps} className={`${styles.root} ${className}`} />
);

export default InputGroup;
