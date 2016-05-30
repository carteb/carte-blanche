import React, { Component, PropTypes } from 'react';

import Button from '../Button';
import styles from './styles.css';

class BooleanInput extends Component { // eslint-disable-line react/prefer-stateless-function

  focus() {
    this.firstButton.focus();
  }

  render() {
    const { value, onChange, ...otherProps } = this.props;
    return (
      <div {...otherProps} className={styles.root}>
        <Button
          groupType="left"
          ref={(ref) => { this.firstButton = ref; }}
          onClick={() => onChange({ value: true })}
          pressed={value}
          className={styles.button}
        >
          true
        </Button>
        <Button
          groupType="center"
          onClick={() => onChange({ value: false })}
          pressed={!value}
          className={styles.button}
        >
          false
        </Button>
      </div>
    );
  }
}

BooleanInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
};

export default BooleanInput;
