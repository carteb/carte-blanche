import React, { PropTypes } from 'react';
import styles from './styles.css';

const Button = (props) => (
  <button
    type={props.type || 'submit'}
    className={styles.button}
    onClick={props.onClick}
  >
    {props.text}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
