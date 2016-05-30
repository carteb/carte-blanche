import React from 'react';
import styles from './styles.css';

const Grid = ({ children }) => (
  <div className={styles.root}>
    <div className={styles.leftBackgroundColumn}></div>
    <div className={styles.rightBackgroundColumn}></div>
    <div className={styles.content}>
      {children}
    </div>
  </div>
);

export default Grid;
