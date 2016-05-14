/* eslint-disable no-param-reassign, max-len */
/**
 * The main navigation with a list of all components
 */

import React from 'react';
import { IndexLink } from 'react-router';

import getComponentNameFromPath from '../../../utils/getComponentNameFromPath';
import styles from './styles.css';
import mapValues from 'lodash/mapValues';
import values from 'lodash/values';
import has from 'lodash/has';

class Navigation extends React.Component {

  state = {
    filterString: '',
  };

  componentDidMount() {
    // making sure the component is re-rendered when the component data is loaded
    document.documentElement.addEventListener(
      'styleguide-plugin-update-navigation',
      () => {
        this.forceUpdate();
      },
      false
    );
  }

  setFilter = (event) => {
    this.setState({
      filterString: event.target.value,
    });
  }

  renderSubNavigation = (componentPath) => {
    if (this.props.activeComponentPath === componentPath) {
      if (has(window.STYLEGUIDE_PLUGIN_CLIENT_API.cache, componentPath)) {
        const plugins = window.STYLEGUIDE_PLUGIN_CLIENT_API.cache[componentPath].navigation;
        return values(mapValues(plugins, (plugin) => (
          <div>
            {
              values(mapValues(plugin, (link) => (
                <div className={styles.subListItemWrapper}>
                  <IndexLink
                    to={`/${componentPath}?id=${link.id}`}
                    className={styles.subListItem}
                    activeClassName={styles.subListItemActive}
                  >
                    {link.title}
                  </IndexLink>
                </div>
              )))
            }
          </div>
        )));
      }

      return null;
    }

    return null;
  }

  renderComponents = () => (
    // Iterate through all components and generate a list
    Object.keys(window.STYLEGUIDE_PLUGIN_CLIENT_API.scripts)
      .map((componentPath) => {
        // Clean the component name
        // TODO Maybe do this earlier, not on every mount
        const componentName = getComponentNameFromPath(componentPath);
        if (componentName.indexOf(this.state.filterString) > -1) {
          return (
            // IndexLink so not all links that match a part of the route are highlighted
            <div key={componentPath} >
              <IndexLink
                to={`/${componentPath}`}
                className={styles.listItem}
                activeClassName={styles.listItemActive}
              >
                {componentName}
              </IndexLink>
              {this.renderSubNavigation(componentPath)}
            </div>
          );
        }
        return null;
      }
    )
  )

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
