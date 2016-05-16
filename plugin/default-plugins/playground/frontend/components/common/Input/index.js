import React, { PropTypes } from 'react';

import Label from '../Label';
import styles from './styles.css';
import objectControlStyles from '../../controls/ObjectControl/styles.css';

function Input(props) {
  let wrapperClassname = objectControlStyles.wrapper;
  if (!props.label && props.isNested) {
    wrapperClassname = styles['wrapper--nested--without-label'];
  } else if (!props.label) {
    wrapperClassname = styles['wrapper--without-label'];
  }
  return (
    <div className={wrapperClassname}>
      {(props.label) ? (
        <Label
          text={props.label}
          isNested={props.isNested}
          onRandomClick={props.onRandomClick}
        />
      ) : null}
      {/* TODO HANDLE UNDEFINED AND NULL */}
      <input
        {...props}
        className={styles.input}
        id={props.label} // Needed so the htmlFor of the label works
      />
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onRandomClick: PropTypes.func,
  value: PropTypes.any,
};

export default Input;
