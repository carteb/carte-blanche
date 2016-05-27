/* eslint-disable no-param-reassign, max-len */
/**
 * The main navigation with a list of all components
 */

import React from 'react';
import { hashHistory, IndexLink } from 'react-router';
import map from 'lodash/map';
import has from 'lodash/has';
import throttle from 'lodash/throttle';
import find from 'lodash/find';
import flatten from 'lodash/flatten';

import smoothscroll from './smoothscroll';
import offsetTopFromPage from './offsetTopFromPage';
import getComponentNameFromPath from '../../../utils/getComponentNameFromPath';

import styles from './styles.css';

window.hashHistory = hashHistory;

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
    hashHistory.listen((location) => {
      if (location.state === null || !location.state.preventScroll) {
        this.setScrollPosition(location.query.id);
      }
    });
  }

  setFilter = (event) => {
    this.setState({
      filterString: event.target.value,
    });
  };

  setScrollPosition = (activeItemId) => {
    const element = document.getElementById(activeItemId);
    if (element) {
      const SMOOTH_SCROLL_SPEED = 250;
      smoothscroll(offsetTopFromPage(element), SMOOTH_SCROLL_SPEED);
    }
  };

  setQueryParamForActiveItemId = () => {
    const plugins = getPlugins(this.props.activeComponentPath);
    const ids = flatten(map(plugins, (plugin) => map(plugin, (link) => link.id)));

    const activeId = find(ids, (id) => {
      const element = document.getElementById(id);
      return window.scrollY <= offsetTopFromPage(element);
    });
    const activeItemId = this.props.location.query.id;
    if (activeId !== activeItemId || activeItemId === undefined) {
      hashHistory.replace({
        pathname: this.props.location.pathname,
        query: { id: activeId },
        state: { preventScroll: true },
      });
    }
  };

  renderSubNavigation = (componentPath) => {
    if (this.props.activeComponentPath === componentPath) {
      if (has(window.STYLEGUIDE_PLUGIN_CLIENT_API.cache, componentPath)) {
        const plugins = getPlugins(componentPath);
        return map(plugins, (plugin, pluginKey) => (
          <div key={pluginKey}>
            {
              map(plugin, (link) => (
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
              ))
            }
          </div>
        ));
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
