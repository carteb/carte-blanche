import React, { PropTypes } from 'react';
import look from 'react-look';

import styles from './styles';

const Button = (props) => (
  <button
    className={(props.type === 'secondary') ? styles.button : styles.buttonPrimary}
    {...props}
  />
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary']),
};

export default look(Button);
