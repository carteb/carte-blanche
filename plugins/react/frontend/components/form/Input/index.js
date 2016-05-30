import React, { Component, PropTypes } from 'react';

import styles from './styles.css';

class Input extends Component { // eslint-disable-line react/prefer-stateless-function

  onChange = (event) => {
    this.props.onChange({ value: event.target.value });
  }

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
