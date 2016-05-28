import React, { PropTypes } from 'react';

import RandomButton from '../RandomButton';
import styles from './styles.css';

function Label(props) {
  return (
    <label
      className={props.secondary ? styles['label--secondary'] : styles.label}
      htmlFor={props.text}
    >
      {props.text}
      {(props.onRandomClick && !props.secondary) && (
        <RandomButton onClick={props.onRandomClick} />
      )}
    </label>
  );
}

Label.propTypes = {
  text: PropTypes.string,
  secondary: PropTypes.bool,
  onRandomClick: PropTypes.func,
};

export default Label;
