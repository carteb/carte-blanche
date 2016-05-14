/* eslint-disable max-len */
/**
 * EditButton
 *
 * Shows a button with a pencil
 */

import React from 'react';
import styles from './styles.css';

const EditButton = (props) => (
  <div {...props} className={styles.base}>
    <svg
      x="0px"
      y="0px"
      width="1.5em"
      height="1.5em"
      viewBox="0 0 24 24"
      className={styles.svg}
      enable-background="new 0 0 24 24"
    >
      <g>
        <path
          d="M12,0C5.383,0,0,5.383,0,12c0,6.616,5.383,12,12,12s12-5.384,12-12C24,5.383,18.617,0,12,0z M5.252,18.093l1.99-4.644 l3.31,3.31l-4.643,1.99c-0.199,0.084-0.41,0.034-0.55-0.106C5.213,18.498,5.171,18.281,5.252,18.093z M7.836,12.628l6.296-6.296 c0.006,0.006,0.008,0.015,0.014,0.021l3.518,3.518l-6.297,6.296L7.836,12.628z M14.853,5.647 c-0.006-0.005-0.015-0.007-0.021-0.014l1.486-1.486c0.195-0.195,0.511-0.195,0.707,0l2.829,2.829c0.195,0.195,0.195,0.511,0,0.707 l-1.482,1.483L14.853,5.647z"
        />
      </g>
      <g>
        <rect
          fill="none"
          width="24"
          height="24"
        />
      </g>
    </svg>
  </div>
);

export default EditButton;
