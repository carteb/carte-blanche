/**
 * Wraps around all views
 */

import React from 'react';
import Navigation from '../Navigation';
import MenuButton from '../MenuButton';

import KeyCodes from '../../../utils/keycodes';
import throttle from 'lodash/throttle';

import styles from './styles.css';

/**
 * Returns true if CMD or CTRL and SHIFT are pressed
 */
function modifiersPressed(evt) {
  return (
    // CTRL or CMD, cross-OS
    evt.ctrlKey || evt.keyCode === 91 || evt.metaKey
    // and SHIFT
  ) && evt.shiftKey;
}

class App extends React.Component {

  state = {
    drawerVisible: true,
  }

  componentDidMount() {
    this.throttledToggleMenu = throttle(this.toggleMenu, 250);
    window.addEventListener('keydown', this.handleKeyPress, false);
  }

  /**
   * Get next component path
   *
   * @return {String} The path to the next component
   */
  getNextComponentPath = () => {
    let nextComponentPath = '';
    let isNextComponent = false;
    // Map over all components
    Object.keys(window.STYLEGUIDE_PLUGIN_CLIENT_API.scripts)
      .some((componentPath) => {
        // If this is the next component, short circuit the some loop by returning
        // true and set path to the current one
        if (isNextComponent) {
          nextComponentPath = componentPath;
          return true;
        }
        // If this is the current component, short circuit the loop at the next
        // interation
        if (this.props.location.pathname.indexOf(componentPath) > -1) {
          isNextComponent = true;
        }
        return false;
      });
    return nextComponentPath;
  };

  /**
   * Get previous component path
   *
   * @return {String} The previous component path
   */
  getPreviousComponentPath = () => {
    let previousComponentPath = '';
    // Map over all components
    Object.keys(window.STYLEGUIDE_PLUGIN_CLIENT_API.scripts)
      .some((componentPath) => {
        // If this is the current component, short curcuit the some loop
        if (this.props.location.pathname.indexOf(componentPath) > -1) {
          return true;
        }
        // If the current component has not been found yet, save the current
        // component path. If the next component is the current one, this'll get
        // returned.
        previousComponentPath = componentPath;
        return false;
      });
    return previousComponentPath;
  };

  handleKeyPress = (evt) => {
    // Use either which or keyCode, depending on browser support
    const keyCode = evt.which || evt.keyCode;
    if (keyCode === KeyCodes.ESC) {
      // If the ESC key was pressed, toggle the menu
      this.throttledToggleMenu();
    } else if (keyCode === KeyCodes.DownArrow && modifiersPressed(evt)) {
      // If CMD+SHIFT+DOWN ARROW was pressed, go to the next component
      const nextComponentPath = this.getNextComponentPath();
      if (nextComponentPath !== '') {
        window.hashHistory.push(nextComponentPath);
      }
    } else if (keyCode === KeyCodes.UpArrow && modifiersPressed(evt)) {
      // If CMD+SHIFT+UP ARROW was pressed, go to the previous component
      const previousComponentPath = this.getPreviousComponentPath();
      if (previousComponentPath !== '') {
        window.hashHistory.push(previousComponentPath);
      }
    }
  };

  toggleMenu = () => {
    this.setState({
      drawerVisible: !this.state.drawerVisible,
    });
  };

  render() {
    const activeComponentPath = this.props.location.pathname.replace(/^\//, '');
    return (
      <div className={styles.main}>
        <Navigation
          activeComponentPath={activeComponentPath}
          components={this.props.components}
          location={this.props.location}
        />
        <div className={(!this.state.drawerVisible) ? styles.preview : styles.previewOpen}>
          <MenuButton
            onClick={this.toggleMenu}
            drawerOpen={this.state.drawerVisible}
          />
          {(this.props.children) ? (
            this.props.children
          ) : (
            <h2>Home</h2>
          )}
        </div>
      </div>
    );
  }
}

export default App;
