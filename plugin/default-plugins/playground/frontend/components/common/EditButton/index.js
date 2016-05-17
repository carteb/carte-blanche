/* eslint-disable max-len */
/**
 * EditButton
 *
 * Shows a button with a pencil
 */

import React from 'react';
import styles from './styles.css';

const EditButton = (props) => (
  <button {...props} className={`${styles.base} ${props.className}`}>
    <svg
      height={(props.height) ? props.height : '24'}
      width={(props.width) ? props.width : '24'}
      version="1.1"
      viewBox="0 0 24 24"
      x="0px"
      y="0px"
      xmlSpace="preserve"
      className={styles.svg}
    >
      <g id="Outline_Icons">
        <g>
          <polygon
            fill="none"
            points="&#xA;&#x9;&#x9;&#x9;&#x9;10.661,16.168 5.711,18.29 7.833,13.339 16.672,4.5 19.5,7.329 &#x9;&#x9;&#x9;"
            strokeLinecap="round"
          />
          <line fill="none" stroke="#000000" strokeLinecap="round" x1="17.664" x2="14.836" y1="9.165" y2="6.336" />
          <line fill="none" stroke="#000000" strokeLinecap="round" x1="10.661" x2="7.833" y1="16.168" y2="13.339" />
          <circle cx="12" cy="12" fill="none" r="11.5" stroke="#000000" strokeLinecap="round" />
        </g>
      </g>
      <g id="Frames-24px">
        <rect height="24" width="24" fill="none" />
      </g>
    </svg>
  </button>
);

export default EditButton;
