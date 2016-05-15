/**
 * Playground
 *
 * The playground with UI fuzz testing
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';

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
    const classname = cx(styles.wrapper, {
      [styles['wrapper--fullHeight']]: this.props.fullHeight,
    });

    return (
      <div className={classname}>
        <div className={styles.buttonWrapper}>
          {(this.props.onEditButtonClick) ? (
            <EditButton onClick={this.onEditButtonClick} />
          ) : null}
          {(this.props.onDeleteButtonClick) ? (
            <DeleteButton onClick={this.onDeleteButtonClick} />
          ) : null}
        </div>
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
  onEditButtonClick: PropTypes.func,
  onDeleteButtonClick: PropTypes.func,
  fullHeight: PropTypes.bool,
  variationPath: PropTypes.string.isRequired,
};

export default Playground;
