import React, { Component, PropTypes } from 'react';

import styles from './styles.css';

class Input extends Component { // eslint-disable-line react/prefer-stateless-function

  onChange = (event) => {
    this.props.onChange({ value: event.target.value });
  }

  blur() {
    this.input.blur();
  }

  focus() {
    this.input.focus();
  }

  render() {
    const { groupType = 'none', className, ...otherProps } = this.props;
    let newClassName = `${styles.root} ${className}`;
    if (groupType === 'left') {
      newClassName = `${newClassName} ${styles.groupLeft}`;
    }
    return (
      <input
        {...otherProps}
        className={newClassName}
        ref={(ref) => { this.input = ref; }}
        onChange={this.onChange}
      />
    );
  }
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  type: PropTypes.oneOf(['text', 'number']),
  groupType: PropTypes.oneOf(['left', 'none']),
};

export default Input;
