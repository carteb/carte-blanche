/**
 * Wraps around all views
 */

import React from 'react';
import Navigation from '../Navigation';
import MenuButton from '../MenuButton';

import styles from './styles.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      drawerVisible: false,
    };
  }

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
