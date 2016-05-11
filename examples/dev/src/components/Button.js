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
  className: PropTypes.string,
  /* HTML native button types */
  // type: PropTypes.oneOf(['submit', 'button', 'reset']),
  children: PropTypes.node.isRequired,
  text: PropTypes.string,
  moreText: PropTypes.string,
  evenMoreText: PropTypes.string,
  'What is this?': PropTypes.string,
};

export default Button;
