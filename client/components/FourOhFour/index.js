/**
 * Wraps around all views
 */

import React from 'react';
import Navigation from '../Navigation';
import styles from '../App/styles.css';

function FourOhFour(props) {
  return (
    <div className={styles.main}>
      <Navigation
        navigationStore={props.navigationStore}
        location={props.location}
      />
      <div className={styles.previewOpen}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          Ohhhh, no, 404! Did you change the path of your component?
        </div>
      </div>
    </div>
  );
}

export default FourOhFour;
