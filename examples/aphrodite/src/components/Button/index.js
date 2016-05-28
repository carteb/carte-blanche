import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';

const baseStyles = {
  padding: '0.5em 1.75em',
  fontSize: '0.75em',
  borderRadius: '3px',
};

const styles = StyleSheet.create({
  button: {
    ...baseStyles,
    border: '1px solid #6CC0E5',
    color: '#6CC0E5',
    backgroundColor: 'white',
  },
  buttonPrimary: {
    ...baseStyles,
    backgroundColor: '#6CC0E5',
    color: 'white',
    border: '1px solid #6CC0E5',
  },
});

const Button = (props) => (
  <button
    className={(props.type === 'secondary') ? css(styles.button) : css(styles.buttonPrimary)}
    {...props}
  />
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary']),
};

export default Button;
