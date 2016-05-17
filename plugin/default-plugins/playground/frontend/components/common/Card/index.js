import React from 'react';

import styles from './styles.css';

const Card = (props) => (
  <div
    {...props}
    className={`${styles.card} ${props.className}`}
  />
);

export default Card;
