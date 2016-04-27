/**
 * The main navigation with a list of all components
 */

import React from 'react';
import { IndexLink } from 'react-router';

import styles from './styles.css';

class Navigation extends React.Component {
  componentWillMount() {
    // Iterate through all components and generate a list
    this.components = Object.keys(window.STYLEGUIDE_PLUGIN_CLIENT_API.scripts)
      .map((componentName) => (
        // IndexLink so not all links that match a part of the route are highlighted
        <IndexLink
          to={`/${componentName}`}
          key={`/${componentName}`}
          className={styles.componentLink}
          activeClassName={styles.componentLinkActive}
        >
          {componentName}
        </IndexLink>
      ));
  }

  render() {
    return (
      <div className={styles.drawer}>
        <h2 className={styles.title}>
          Components
        </h2>
        <div className={styles.list}>
          <IndexLink
            to="/"
            className={styles.componentLink}
            activeClassName={styles.componentLinkActive}
          >
            Home
          </IndexLink>
          {this.components}
        </div>
      </div>
    );
  }
}

export default Navigation;
