/* eslint-disable no-param-reassign, max-len */
/**
 * The main navigation with a list of all components
 */

import React from 'react';
import { IndexLink } from 'react-router';

import getComponentNameFromPath from '../../utils/getComponentNameFromPath';
import styles from './styles.css';

class Navigation extends React.Component {
  componentWillMount() {
    // Iterate through all components and generate a list
    this.components = Object.keys(window.STYLEGUIDE_PLUGIN_CLIENT_API.scripts)
      .map((componentPath) => {
        // Clean the component name
        // TODO Maybe do this earlier, not on every mount
        const componentName = getComponentNameFromPath(componentPath);
        return (
          // IndexLink so not all links that match a part of the route are highlighted
          <IndexLink
            to={`/${componentPath}`}
            key={`/${componentPath}`}
            className={styles.listItem}
            activeClassName={styles.listItemActive}
          >
            {componentName}
          </IndexLink>
        );
      });
  }

  render() {
    return (
      <div className={styles.drawer}>
        <IndexLink
          to="/"
          className={styles.titleItem}
        >
          <h2 className={styles.title}>
            Home
          </h2>
        </IndexLink>
        <div className={styles.list}>
          {this.components}
        </div>
      </div>
    );
  }
}

export default Navigation;
