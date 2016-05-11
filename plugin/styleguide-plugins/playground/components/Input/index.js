import React, { PropTypes } from 'react';

import RandomButton from '../../Playground/RandomButton';
import styles from './styles.css';

function Input(props) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={props.label}>
        {props.label}
        <RandomButton onClick={props.onRandomClick} />
      </label>
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
  value: PropTypes.any.isRequired,
};

export default Input;
