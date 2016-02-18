import React, { PropTypes } from 'react';

/**
 * Button component
 *
 * @example
 * <Component>Follow us on Twitter</Component>
 * @example
 * <Component type="reset">Reset Form</Component>
 */
const Button = ({ className = 'test', type = 'button', children }) => (
  <button
    className={className}
    type={type}
  >
    { children }
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  /* HTML native button types */
  type: PropTypes.oneOf(['submit', 'button', 'reset']),
  children: PropTypes.node.isRequired,
};

export default Button;
