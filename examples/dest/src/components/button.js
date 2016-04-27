import React from 'react';

const Button = ({ className = 'test', type = 'button' }) => ((
  <button
    className={className}
    type={type}
  >
    Follow Me
  </button>
));

Button.propTypes = {
  className: React.PropTypes.string,
  /* HTML native button types */
  type: React.PropTypes.oneOf(['submit', 'button', 'reset']),
};

export default Button;
