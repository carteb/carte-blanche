import React, { PropTypes } from 'react';
import styles from './styles.css';

const Button = ({ type = 'submit', onClick, className, text, ...otherProps }) => (
  <button
    type={type}
    className={`${styles.button} ${className}`}
    onClick={onClick}
    {...otherProps}
  >
    {text}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
