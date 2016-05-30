import React from 'react';

import Button from '../Button';
import styles from './styles.css';

const RandomButton = (props) => (
  <Button {...props} groupType="right">
    <svg
      className={styles.svg}
      width="16px"
      height="13px"
      viewBox="0 0 16 13"
      version="1.1"
    >
      <g stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
        <g transform="translate(1.000000, 0.000000)">
          <path
            d="M10.9831425,0.248038552 L10.9831425,5.66105236 L15.0588235,2.95454545 L10.9831425,0.248038552 Z" // eslint-disable-line max-len
            fill="#999999"
          />
          <path
            d="M10.9831425,7.33894764 L10.9831425,12.7519614 L15.0588235,10.0454545 L10.9831425,7.33894764 Z" // eslint-disable-line max-len
            fill="#999999"
          />
          <path
            d="M0.739722594,10.0454545 L3.48285708,10.0454545 C4.03747416,10.0454545 4.72728114,9.66421648 5.01712405,9.20418863 L8.42469998,3.79581137 C8.71743515,3.33119303 9.40462323,2.95454545 9.95374013,2.95454545 L11.6791444,2.95454545" // eslint-disable-line max-len
            stroke="#979797"
            strokeWidth="2"
            strokeLinecap="square"
          />
          <path
            d="M0.739722594,10.0454545 L3.48285708,10.0454545 C4.03747416,10.0454545 4.72728114,9.66421648 5.01712405,9.20418863 L8.42469998,3.79581137 C8.71743515,3.33119303 9.40462323,2.95454545 9.95374013,2.95454545 L11.6791444,2.95454545" // eslint-disable-line max-len
            stroke="#979797"
            strokeWidth="2"
            strokeLinecap="square"
            transform="translate(6.209433, 6.500000) scale(1, -1) translate(-6.209433, -6.500000) "
          />
        </g>
      </g>
    </svg>
  </Button>
);

export default RandomButton;
