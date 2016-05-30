import React from 'react';

import styles from './styles.css';

const Label = ({ propKey, type, ...otherProps }) => (
  <div {...otherProps} className={styles.root}>
    <div className={styles.type}>{type}</div>
    <div className={styles.propKey}>{propKey}</div>
  </div>
);

export default Label;
