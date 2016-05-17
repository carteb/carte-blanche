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
import throttle from 'lodash/throttle';
import find from 'lodash/find';
import flatten from 'lodash/flatten';

const getPlugins = (path) => window.STYLEGUIDE_PLUGIN_CLIENT_API.cache[path].navigation;

class Navigation extends React.Component {

  state = {
    filterString: '',
  };

  componentDidMount() {
    // making sure the component is re-rendered when the component data is loaded
    document.documentElement.addEventListener(
      'styleguide-plugin-update-navigation',
      () => this.forceUpdate(),
      false
    );

    window.addEventListener('scroll', throttle(this.setQueryParamForActiveItemId, 50), false);
    window.addEventListener('hashchange', this.setScrollPosition, false);
  }

  setFilter = (event) => {
    this.setState({
      filterString: event.target.value,
    });
  };

  setScrollPosition = () => {
    const element = document.getElementById(this.props.activeItemId);
    if (element) {
      window.scroll(window.scrollX, element.offsetTop);
    }
  };

  setQueryParamForActiveItemId = () => {
    const plugins = getPlugins(this.props.activeComponentPath);
    const ids = flatten(values(mapValues(plugins, (plugin) => values(mapValues(plugin, (link) => link.id)))));

    const activeId = find(ids, (id) => {
      const element = document.getElementById(id);
      return window.scrollY <= element.offsetTop;
    });

    if (this.props.activeItemId) {
      window.location.hash = window.location.hash.replace(/id=.+&/, `id=${activeId}&`);
    } else {
      // in case the id is not set
      window.location.hash = window.location.hash.replace(/\?/, `?id=${activeId}&`);
    }
  };

  renderSubNavigation = (componentPath) => {
    if (this.props.activeComponentPath === componentPath) {
      if (has(window.STYLEGUIDE_PLUGIN_CLIENT_API.cache, componentPath)) {
        const plugins = getPlugins(componentPath);
        return values(mapValues(plugins, (plugin, pluginKey) => (
          <div key={pluginKey}>
            {
              values(mapValues(plugin, (link) => (
                <div
                  className={styles.subListItemWrapper}
                  key={link.id}
                >
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
  };

  renderComponents = () => (
    // Iterate through all components and generate a list
    Object.keys(window.STYLEGUIDE_PLUGIN_CLIENT_API.scripts)
      .map((componentPath) => {
        // Clean the component name
        // TODO Maybe do this earlier, not on every mount
        const componentName = getComponentNameFromPath(componentPath);
        if (componentName.toLowerCase().indexOf(this.state.filterString.toLowerCase()) > -1) {
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
  );

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
