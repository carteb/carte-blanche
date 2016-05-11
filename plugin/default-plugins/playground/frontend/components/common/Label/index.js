import React, { PropTypes } from 'react';

import RandomButton from '../RandomButton';
import styles from './styles.css';

function Label(props) {
  return (
    <label
      className={styles.label}
      htmlFor={props.text}
    >
      {props.text}
      {(props.onRandomClick) ? (
        <RandomButton onClick={props.onRandomClick} />
      ) : null}
    </label>
  );
}

Label.propTypes = {
  text: PropTypes.string,
  onRandomClick: PropTypes.func,
};

export default Label;
