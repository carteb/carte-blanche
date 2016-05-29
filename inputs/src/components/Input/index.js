import React, { Component, PropTypes } from 'react';

import styles from './styles.css';

class Input extends Component { // eslint-disable-line react/prefer-stateless-function

  focus() {
    this.input.focus();
  }

  render() {
    const { groupType = 'none', ...otherProps } = this.props;
    let className = styles.root;
    if (groupType === 'left') {
      className = `${className} ${styles.groupLeft}`;
    }
    return (
      <input
        {...otherProps}
        className={className}
        ref={(ref) => { this.input = ref; }}
      />
    );
  }
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  groupType: PropTypes.oneOf(['left', 'none']),
};

export default Input;
