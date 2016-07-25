/**
 * Button
 *
 * Render a button
 */

import React from 'react';
import styles from './styles.css';

const Button = (props) => (
  <button {...props} className={`${styles.base} ${props.className}`} />
);

export default Button;
