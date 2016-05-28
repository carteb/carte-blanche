import React, { PropTypes } from 'react';
import { css } from 'aphrodite';

import styles from './styles';

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
