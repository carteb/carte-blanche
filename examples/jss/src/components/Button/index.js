import React, { PropTypes } from 'react';
import useSheet from 'react-jss';
import jss from 'jss';
import extend from 'jss-extend';

// Setup jss plugins.
jss.use(extend());

import styles from './styles';

const Button = (props) => (
  <button
    className={
      (props.type === 'secondary') ?
      props.sheet.classes.button :
      props.sheet.classes.buttonPrimary
    }
    {...props}
  />
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary']),
};

export default useSheet(Button, styles);
