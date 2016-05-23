/**
 * Playground
 *
 * The playground with UI fuzz testing
 */

import React, { PropTypes } from 'react';
import { VelocityComponent } from 'velocity-react';
import Frame from 'react-frame-component';
import map from 'lodash/map';

import EditButton from '../common/EditButton';
import DeleteButton from '../common/DeleteButton';
import Card from '../common/Card';
import styles from './styles.css';

class Playground extends React.Component {
  state = {
    buttonsVisible: false,
    delay: true,
  };

  onEditButtonClick = () => {
    this.props.onEditButtonClick(this.props.variationPath);
  };

  onDeleteButtonClick = () => {
    this.props.onDeleteButtonClick(this.props.variationPath);
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

  showButtonsDirectly = () => {
    this.setState({
      buttonsVisible: true,
      delay: false,
    });
  };

  activateDelay = () => {
    this.setState({
      delay: true,
    });
  };

  render() {
    const Component = this.props.component;

    // Delay the fade in and the fade out for 500ms
    // Don't delay the fade in at all if we're directly hovering over the buttons
    let delay;
    if (this.state.delay) {
      delay = 500;
    } else {
      delay = 0;
    }

    return (
      <div
        className={
          (this.props.fullHeight) ?
          styles['wrapper--fullHeight'] :
          styles.wrapper
        }
        id={this.props.variationPath}
        onMouseLeave={this.hideButtons}
      >
        {/* Title */}
        {(this.props.title) && (
          <h3 className={styles.title}>{this.props.title}</h3>
        )}
        <Card
          className={styles.card}
          onMouseEnter={this.showButtons}
        >

          {/* Don't render anything if neither button actions are specified*/}
          {(this.props.onEditButtonClick || this.props.onDeleteButtonClick) && (
            <VelocityComponent
              animation={{
                opacity: this.state.buttonsVisible ? 1 : 0,
              }}
              duration={100}
              delay={delay}
              easing="ease-in-out"
            >
              <div
                className={styles.buttonWrapper}
                onMouseEnter={this.showButtonsDirectly}
                onMouseLeave={this.activateDelay}
              >
                {this.props.onEditButtonClick && (
                  <EditButton
                    className={styles.button}
                    onClick={this.onEditButtonClick}
                  />
                )}
                {this.props.onDeleteButtonClick && (
                  <DeleteButton
                    className={styles.button}
                    onClick={this.onDeleteButtonClick}
                  />
                )}
              </div>
            </VelocityComponent>
          )}

          {/* Render the actual component */}
          <Frame
            initialContent={`
              <!DOCTYPE html>
              <html style="height: 100%; width: 100%; margin: 0; padding: 0;">
                <head>
                  ${map(this.props.stylingNodes, (styleNode) => styleNode.outerHTML).join('')}
                </head>
                <body style="height: 100%; width: 100%; margin: 0; padding: 0;">
                  <div
                    id="root"
                    style="
                      height: 100%;
                      width: 100%;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  ></div>
                </body>
              </html>
            `}
            mountTarget="#root"
            className={styles.componentFrame}
          >
            <Component {...this.props.variationProps} />
          </Frame>
        </Card>
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
  title: PropTypes.string,
  stylingNodes: PropTypes.array,
};

export default Playground;
