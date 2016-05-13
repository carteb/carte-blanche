/**
 * Playground
 *
 * The playground with UI fuzz testing
 */

import React, { PropTypes } from 'react';
import styles from './styles.css';

function Playground(props) {
  const Component = props.component;

  return (
    <div className={styles.wrapper}>
      <div className={styles.componentWrapper}>
        <Component {...props.variationProps} />
      </div>
    </div>
  );
}

Playground.propTypes = {
  variationProps: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired, // TODO is this really always a function
};

export default Playground;
