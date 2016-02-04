import React from 'react';

const Button = ({ className = 'test' }) => ((
  <button
    className={ className }
  >
    Follow Me
  </button>
));

Button.propTypes = {
  className: React.PropTypes.string
}

export default Button;
