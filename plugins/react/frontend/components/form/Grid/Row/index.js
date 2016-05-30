import React from 'react';
import styles from './styles.css';

const Row = ({ children, ...otherProps }) => (
  <div {...otherProps} className={styles.root}>
    {children}
    <div className={styles.clearfix} />
  </div>
);

export default Row;
