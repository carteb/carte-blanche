import React, { PropTypes } from 'react';

import Label from '../Label';
import styles from './styles.css';

function Input(props) {
  let wrapperClassname = '';
  return (
    <div className={wrapperClassname}>
      {(props.secondaryLabel) && (
        <Label
          text={props.secondaryLabel}
          onRandomClick={props.onRandomClick}
          secondary
        />
      )}
      {(props.label) && (
        <Label
          text={props.label}
          onRandomClick={props.onRandomClick}
        />
      )}
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
  secondaryLabel: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onRandomClick: PropTypes.func,
  value: PropTypes.any,
};

export default Input;
