import React, { PropTypes } from 'react';
import Radium from 'radium';

import styles from './styles';

class Button extends React.Component { // eslint-disable-line react/prefer-stateless-function,max-len
  render() {
    return (
      <button
        style={[
          styles.button,
          styles[this.props.type],
        ]}
        {...this.props}
      />
    );
  }
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary']),
};

export default Radium(Button);
