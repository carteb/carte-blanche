import React, { PropTypes } from 'react';

import styles from './styles.css';

const Button = (props) => {
  const { groupType = 'none' } = props;
  let className = styles.root;
  if (groupType === 'center') {
    className = `${className} ${styles.groupCenter}`;
  } else if (groupType === 'right') {
    className = `${className} ${styles.groupRight}`;
  }
  return (
    <button type="button" {...props} className={className} />
  );
};

Button.propTypes = {
  groupType: PropTypes.oneOf(['center', 'right', 'none']),
};

export default Button;
