/**
 * Playground
 *
 * The playground with UI fuzz testing
 */

import React, { PropTypes } from 'react';

import EditButton from '../common/EditButton';
import styles from './styles.css';

class Playground extends React.Component {
  onEditButtonClick = () => {
    this.props.onEditButtonClick(this.props.variationPath);
  };

  render() {
    const Component = this.props.component;

    return (
      <div
        className={
          (this.props.big) ?
          styles.wrapperBig :
          styles.wrapper
        }
      >
        <EditButton onClick={this.onEditButtonClick} />
        <div className={styles.componentWrapper}>
          <Component {...this.props.variationProps} />
        </div>
      </div>
    );
  }
}

Playground.propTypes = {
  variationProps: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired, // TODO is this really always a function
  onEditButtonClick: PropTypes.func.isRequired,
  variationPath: PropTypes.string.isRequired,
};

export default Playground;
