import React, { PropTypes } from 'react';

import styles from './styles';

const Button = (props) => (
  <button
    style={(props.type === 'secondary') ? styles.button : styles.buttonPrimary}
    {...props}
  />
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary']),
};

export default Button;
