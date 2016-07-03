/* eslint-disable max-len */
/**
 * RefreshButton
 *
 * Shows a button with a refresh
 */

import React from 'react';
import styles from './styles.css';

import Button from '../Button';

const DeleteButton = (props) => (
  <Button className={props.className}>
    <svg
      className={styles.svg}
      height={(props.height) ? props.height : '24'}
      width={(props.width) ? props.width : '24'}
      height="24px"
      width="24px"
      version="1.1"
      viewBox="0 0 24 24"
      x="0px"
      y="0px"
      xmlSpace="preserve"
    >
      <g id="Outline_Icons_1_">
        <g id="Outline_Icons">
          <g>
            <polyline fill="none" points="&#xA;&#x9;&#x9;&#x9;&#x9;0.927,10.199 3.714,14.35 6.919,10.512 &#x9;&#x9;&#x9;" stroke="#000000" strokeLinecap="round" />
            <polyline fill="none" points="&#xA;&#x9;&#x9;&#x9;&#x9;23.5,14.5 20.714,10.35 17.508,14.188 &#x9;&#x9;&#x9;" stroke="#000000" strokeLinecap="round" />
            <path d="M20.677,10.387&#xA;&#x9;&#x9;&#x9;&#x9;c0.834,4.408-2.273,8.729-6.509,9.729c-2.954,0.699-5.916-0.238-7.931-2.224" fill="none" stroke="#000000" strokeLinecap="round" />
            <path d="M3.719,14.325&#xA;&#x9;&#x9;&#x9;&#x9;C2.405,9.442,5.688,4.65,10.257,3.572c3.156-0.747,6.316,0.372,8.324,2.641" fill="none" stroke="#000000" strokeLinecap="round" />
          </g>
        </g>
        <g id="New_icons_1_" />
      </g>
      <g id="Invisible_Shape">
        <rect height="24" width="24" fill="none" />
      </g>
    </svg>
  </Button>
);

export default DeleteButton;
