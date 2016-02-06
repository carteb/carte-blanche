import React, { PropTypes } from 'react';

/**
 * Button component
 *
 * @example
 * <Button>Follow us on Twitter</Button>
 * @example
 * <Button type="reset">Reset Form</Button>
 */
const Button = ({ className = 'test', type = 'button', children }) => ((
  <button
    className={className}
    type={type}
  >
    { children }
  </button>
));

Button.propTypes = {
  className: PropTypes.string,
  /* HTML native button types */
  type: PropTypes.oneOf(['submit', 'button', 'reset']),
  children: PropTypes.node.isRequired,
};

export default Button;
