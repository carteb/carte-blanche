import React from 'react';

import Button from '../Button';
import styles from './styles.css';

const BaseSettings = ({ onChange, ...otherProps }) => {
  const onChangeToUndefined = () => {
    onChange({ value: undefined });
  };
  const onChangeToNull = () => {
    onChange({ value: null });
  };
  return (
    <div {...otherProps} className={styles.settingsContent}>
      <Button onClick={onChangeToUndefined}>
        Set to <span className={styles.highlighted}>undefined</span>
      </Button>
      <Button onClick={onChangeToNull}>
        Set to <span className={styles.highlighted}>null</span>
      </Button>
    </div>
  );
};

export default BaseSettings;
