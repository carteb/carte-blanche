/**
 * Wraps around all views
 */

import React from 'react';
import Navigation from '../Navigation';

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
  }

  render() {
    return (
      <div className={styles.main}>
        <Navigation />
        <div className={(!this.state.drawerVisible) ? styles.preview : styles.previewOpen}>
          <button
            className={styles.menuButton}
            onClick={this.toggleMenu}
          >
            Menu
          </button>
          <div className={styles.componentWrapper}>
            {(this.props.children) ? (
              <div>{this.props.children}</div>
            ) : (
              <h2>Home</h2>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
