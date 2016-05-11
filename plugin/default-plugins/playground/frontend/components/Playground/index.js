/**
 * Playground
 *
 * The playground with UI fuzz testing
 */

import React, { PropTypes } from 'react';
import styles from './styles.css';
import renderControls from '../../utils/renderControls';
import randomValues from '../../utils/randomValues';

class Playground extends React.Component {
  constructor() {
    super();
    this.togglePropForm = this.togglePropForm.bind(this);
  }

  state = {
    propFormVisible: false,
  };

  togglePropForm() {
    this.setState({
      propFormVisible: !this.state.propFormVisible,
    });
  }

  render() {
    // globalComponentProps and setGlobalComponentProps are injected by recompose's
    // withState() higher order component, additionally pass metadataWithControls
    // and component in order to render the preview and the random value controls
    const {
      globalComponentProps,
      setGlobalComponentProps,
      metadataWithControls,
    } = this.props;
    const Component = this.props.component;

    return (
      <div className={styles.wrapper}>
        <div
          className={
            (this.state.propFormVisible) ?
            styles['sidebar--propFormOpen'] :
            styles.sidebar
          }
        >
          <div className={styles.sidebarButtonWrapper}>
            <button
              className={styles.sidebarButton}
              onClick={this.togglePropForm}
            >
              Props
            </button>
          </div>
          <div
            className={
              (this.state.propFormVisible) ?
              styles.propsFormVisible :
              styles.propsForm
            }
          >
            <button
              className={styles.propFormRandomizeButton}
              onClick={() => setGlobalComponentProps(randomValues(metadataWithControls))}
            >
              Randomize
            </button>
            <div className={styles.propFormControls}>
              {renderControls(metadataWithControls, globalComponentProps, setGlobalComponentProps)}
            </div>
          </div>
        </div>
        <div className={styles.componentWrapper}>
          <Component {...globalComponentProps} />
        </div>
      </div>
    );
  }
}

Playground.propTypes = {
  globalComponentProps: PropTypes.object.isRequired,
  setGlobalComponentProps: PropTypes.func.isRequired,
  metadataWithControls: PropTypes.object.isRequired,
  component: PropTypes.func, // TODO is this really always a function
};

export default Playground;
