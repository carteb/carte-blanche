/**
 * RandomButton
 *
 * Shows a button with a dice
 */

import React from 'react';
import styles from './styles';

// TODO should this a button instead of div?
const RandomButton = (props) => (
  <div {...props} style={styles.base}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={styles.icon}
    >
      <g
        stroke="#000"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        fill="none"
      >
        <path
          d="M14.5 9v-3l-8-3v5.5"
        />
        <path
          strokeLinecap="round"
          d="M9.5 13l-8-3v10l8 3.5zM9.5 13l8-3v10l-8 3.5zM17.5 10.002l-8-2.502-8 2.502"
        />
        <path
          d="M14.5 6l8-3v10l-5 2"
        />
        <path
          strokeLinecap="round"
          d="M22.5 3.002l-8-2.502-8 2.502"
        />
        <path
          d="M15 3c0 .276-.224.5-.5.5s-.5-.224-.5-.5.224-.5.5-.5.5.224.5.5zM20.5 6.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5.224-.5.5-.5.5.224.5.5zM20.5 11.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5.224-.5.5-.5.5.224.5.5zM10 10c0 .276-.224.5-.5.5s-.5-.224-.5-.5.224-.5.5-.5.5.224.5.5zM4.5 14.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5.224-.5.5-.5.5.224.5.5zM7.5 19.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5.224-.5.5-.5.5.224.5.5zM12.5 19.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5.224-.5.5-.5.5.224.5.5zM14 17c0 .276-.224.5-.5.5s-.5-.224-.5-.5.224-.5.5-.5.5.224.5.5zM15.5 14.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5.224-.5.5-.5.5.224.5.5z" // eslint-disable-line max-len
        />
      </g>
    </svg>
  </div>
);

export default RandomButton;
