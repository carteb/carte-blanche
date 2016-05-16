/**
 * Playground
 *
 * The playground with UI fuzz testing
 */

import React, { PropTypes } from 'react';
import { VelocityComponent } from 'velocity-react';
import cx from 'classnames';

import EditButton from '../common/EditButton';
import DeleteButton from '../common/DeleteButton';
import styles from './styles.css';

class Playground extends React.Component {
  state = {
    buttonHandleVisible: false,
    buttonsVisible: false,
  };

  onEditButtonClick = () => {
    this.props.onEditButtonClick(this.props.variationPath);
  };

  onDeleteButtonClick = () => {
    this.props.onDeleteButtonClick(this.props.variationPath);
  };

  onMouseEnter = () => {
    this.setState({
      buttonHandleVisible: true,
    });
  };

  onMouseLeave = () => {
    this.setState({
      buttonHandleVisible: false,
    });
  };

  showButtons = () => {
    this.setState({
      buttonsVisible: true,
    });
  };

  hideButtons = () => {
    this.setState({
      buttonsVisible: false,
    });
  };

  render() {
    const Component = this.props.component;
    const classname = cx(styles.wrapper, {
      [styles['wrapper--fullHeight']]: this.props.fullHeight,
    });

    return (
      <div
        className={classname}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {/* Don't render anything if neither button actions are specified*/}
        {(this.props.onEditButtonClick || this.props.onDeleteButtonClick) ? (
          <VelocityComponent
            animation={{
              opacity: this.state.buttonHandleVisible ? 1 : 0,
            }}
            duration={150}
            /* Delay the fade in for 500ms, but not the fade out */
            delay={(this.state.buttonHandleVisible) ? 500 : 0}
            easing="ease-in-out"
            display={(this.state.buttonHandleVisible) ? 'block' : 'none'}
          >
            <div
              className={styles.buttonWrapper}
              onMouseLeave={this.hideButtons}
            >
              <div
                className={styles.buttonHandle}
                onMouseEnter={this.showButtons}
              />
              <VelocityComponent
                animation={{
                  translateX: (this.state.buttonsVisible) ? '0%' : '100%',
                }}
                duration={150}
                easing="ease-in-out"
                delay={(this.state.buttonsVisible) ? 0 : 500}
                display={(this.state.buttonsVisible) ? 'block' : 'none'}
              >
                <div className={styles.buttons}>
                  {(this.props.onEditButtonClick) ? (
                    <EditButton onClick={this.onEditButtonClick} />
                  ) : null}
                  {(this.props.onDeleteButtonClick) ? (
                    <DeleteButton onClick={this.onDeleteButtonClick} />
                  ) : null}
                </div>
              </VelocityComponent>
            </div>
          </VelocityComponent>
        ) : null}
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
