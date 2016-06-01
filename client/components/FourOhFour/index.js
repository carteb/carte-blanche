/**
 * Wraps around all views
 */

import React from 'react';
import Navigation from '../Navigation';
import styles from '../App/styles.css';

function FourOhFour(props) {
  const activeComponentPath = props.location.pathname.replace(/^\//, '');
  return (
    <div className={styles.main}>
      <Navigation
        activeComponentPath={activeComponentPath}
        components={props.components}
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
          404!
        </div>
      </div>
    </div>
  );
}

export default FourOhFour;
