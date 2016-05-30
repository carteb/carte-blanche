import React from 'react';
import styles from './styles.css';
import range from 'lodash/range';

const LeftColumn = ({ nestedLevel = 0, children, ...otherProps }) => (
  <div {...otherProps} className={styles.root}>
    {
      range(nestedLevel).map(() => <div className={styles.line}>&nbsp;</div>)
    }
    {children}
  </div>
);

export default LeftColumn;
