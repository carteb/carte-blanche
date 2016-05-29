import React from 'react';
import styles from './styles.css';

const RightColumn = (props) => (
  <div {...props} className={styles.root}>
    {props.children}
  </div>
);

export default RightColumn;
