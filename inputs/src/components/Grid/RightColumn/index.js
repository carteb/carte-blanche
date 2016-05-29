import React from 'react';
import styles from './styles.css';

const RightColumn = (props) => (
  <div {...props} className={styles.root}>
    <div className={styles.child}>
      {props.children}
    </div>
  </div>
);

export default RightColumn;
