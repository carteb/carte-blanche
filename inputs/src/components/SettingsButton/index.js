import React from 'react';

import Button from '../Button';
import styles from './styles.css';

const SettingsButton = (props) => (
  <Button {...props}>
    <svg
      width="10px"
      height="8px"
      viewBox="0 0 10 8"
      version="1.1"
      className={styles.svg}
    >
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
        <polygon
          fill="#999999"
          transform="translate(5.000000, 4.000000) scale(1, -1) translate(-5.000000, -4.000000) "
          points="5 0 10 8 0 8 "
        />
      </g>
    </svg>
  </Button>
);

export default SettingsButton;
