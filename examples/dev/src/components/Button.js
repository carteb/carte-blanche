import React, { PropTypes } from 'react';

/**
 * Button component
 */
const Button = ({ className, type, children }) => (
  <button
    className={className}
    type={type}
  >
    {children}
  </button>
);

Button.propTypes = {
  arrayOfStrings: PropTypes.arrayOf(PropTypes.string),
  arrayOfNumbers: PropTypes.arrayOf(PropTypes.number),
  className: PropTypes.string,
  /* HTML native button types */
  type: PropTypes.oneOf(['submit', 'button', 'reset']),
  children: PropTypes.node.isRequired,
};

export default Button;
