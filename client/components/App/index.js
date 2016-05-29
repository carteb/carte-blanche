/**
 * Wraps around all views
 */

import React from 'react';
import Navigation from '../Navigation';
import MenuButton from '../MenuButton';

import KeyCodes from '../../../utils/keycodes';
import throttle from 'lodash/throttle';

import styles from './styles.css';

class App extends React.Component {

  state = {
    drawerVisible: true,
  }

  componentDidMount() {
    window.addEventListener('keydown', throttle(this.handleKeyPress, 250), false);
  }

  handleKeyPress = (evt) => {
    // Use either which or keyCode, depending on browser support
    const keyCode = evt.which || evt.keyCode;
    if (keyCode === KeyCodes.ESC) {
      // If the ESC key was pressed, toggle the menu
      this.toggleMenu();
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
