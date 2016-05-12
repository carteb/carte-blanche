/* eslint-disable no-param-reassign, max-len */
/**
 * The main navigation with a list of all components
 */

import React from 'react';
import { IndexLink } from 'react-router';

import getComponentNameFromPath from '../../utils/getComponentNameFromPath';
import styles from './styles.css';

class Navigation extends React.Component {
  constructor() {
    super();
    this.setFilter = this.setFilter.bind(this);
    this.renderComponents = this.renderComponents.bind(this);
  }

  state = {
    filterString: '',
  };

  setFilter(e) {
    this.setState({
      filterString: e.target.value,
    });
  }

  renderComponents() {
    // Iterate through all components and generate a list
    return Object.keys(window.STYLEGUIDE_PLUGIN_CLIENT_API.scripts)
      .map((componentPath) => {
        // Clean the component name
        // TODO Maybe do this earlier, not on every mount
        const componentName = getComponentNameFromPath(componentPath);
        if (componentName.indexOf(this.state.filterString) > -1) {
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
        }
        return null;
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
        <input
          className={styles.filterInput}
          placeholder="Filter"
          onChange={this.setFilter}
        />
        <div className={styles.list}>
          {this.renderComponents()}
        </div>
      </div>
    );
  }
}

export default Navigation;
