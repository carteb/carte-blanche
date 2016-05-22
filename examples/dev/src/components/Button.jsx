import React, { PropTypes } from 'react';

/**
 * Button component
 */
const Button = ({ className, type, children, onClick }) => (
  <button
    className={className}
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  /* HTML native button types */
  type: PropTypes.oneOf(['submit', 'button', 'reset']),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default Button;
