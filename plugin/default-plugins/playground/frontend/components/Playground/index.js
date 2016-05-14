/**
 * Playground
 *
 * The playground with UI fuzz testing
 */

import React, { PropTypes } from 'react';

import EditButton from '../common/EditButton';
import DeleteButton from '../common/DeleteButton';
import styles from './styles.css';

class Playground extends React.Component {
  onEditButtonClick = () => {
    this.props.onEditButtonClick(this.props.variationPath);
  };

  onDeleteButtonClick = () => {
    this.props.onDeleteButtonClick(this.props.variationPath);
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
        <DeleteButton onClick={this.onDeleteButtonClick} />
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
  onDeleteButtonClick: PropTypes.func.isRequired,
  variationPath: PropTypes.string.isRequired,
};

export default Playground;
