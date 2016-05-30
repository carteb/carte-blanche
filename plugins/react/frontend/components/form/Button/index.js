import React, { PropTypes } from 'react';

import styles from './styles.css';

class Button extends React.Component {

  static propTypes = {
    groupType: PropTypes.oneOf(['left', 'center', 'right', 'none']),
    pressed: PropTypes.bool,
  };

  static defaultProps = {
    groupType: 'none',
    type: 'button',
    pressed: false,
  };

  focus() {
    this.button.focus();
  }

  render() {
    const { groupType, pressed, className, ...otherProps } = this.props;
    let newClassName = `${className} ${styles.root}`;
    if (groupType === 'center') {
      newClassName = `${newClassName} ${styles.groupCenter}`;
    } else if (groupType === 'right') {
      newClassName = `${newClassName} ${styles.groupRight}`;
    } else if (groupType === 'left') {
      newClassName = `${newClassName} ${styles.groupLeft}`;
    }
    if (pressed) {
      newClassName = `${newClassName} ${styles.pressed}`;
    }
    return (
      <button
        {...otherProps}
        className={newClassName}
        ref={(ref) => { this.button = ref; }}
      />
    );
  }
}

export default Button;
