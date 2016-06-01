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

class Navigation extends React.Component {

  state = {
    filterString: '',
    shortcutHelpVisible: false,
    informationVisible: false,
  };

  componentDidMount() {
    // making sure the component is re-rendered when the component data is loaded
    this.props.navigationStore.subscribe(() => this.forceUpdate());

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
    const plugins = this.getPlugins(this.getActiveComponentPath());
    const ids = flatten(map(plugins, (plugin) => map(plugin, (link) => link.link)));
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

  getActiveComponentPath = () => this.props.location.pathname.replace(/^\//, '');

  getPlugins = (componentPath) => {
    const navigationState = this.props.navigationStore.getState();
    if (has(navigationState, componentPath)) {
      return navigationState[componentPath].plugins;
    }

    return {};
  }

  toggleShortcutHelp = () => {
    this.setState({
      shortcutHelpVisible: !this.state.shortcutHelpVisible,
      informationVisible: false,
    });
  };

  toggleInformation = () => {
    this.setState({
      informationVisible: !this.state.informationVisible,
      shortcutHelpVisible: false,
    });
  };

  renderSubNavigation = (componentPath) => {
    if (this.getActiveComponentPath() === componentPath) {
      return map(this.getPlugins(componentPath), (plugin, pluginKey) => (
        <div key={pluginKey}>
          {
            map(plugin, (link) => (
              <div
                className={styles.subListItemWrapper}
                key={link.link}
              >
                <IndexLink
                  to={`/${componentPath}?id=${link.link}`}
                  className={styles.subListItem}
                  activeClassName={styles.subListItemActive}
                >
                  {link.name}
                </IndexLink>
              </div>
            ))
          }
        </div>
      ));
    }

    return null;
  };

  renderComponents = () => (
    // Iterate through all components and generate a list
    Object.keys(this.props.navigationStore.getState())
      .map((componentPath) => {
        // Clean the component name
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
    const {
      shortcutHelpVisible,
      informationVisible,
    } = this.state;
    // Get Footer Classname
    const footerClassname = (
      shortcutHelpVisible || informationVisible
    ) ? styles.footerExpanded : styles.footer;
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
          type="search"
          placeholder="Type to filter components"
          onChange={this.setFilter}
        />
        <div className={styles.list}>
          {this.renderComponents()}
        </div>
        <div className={footerClassname}>
          {/* &#8984; &#8679; / &#8963; &#8679; */}
          <button
            className={(shortcutHelpVisible) ? styles.footerButtonActive : styles.footerButton}
            onClick={this.toggleShortcutHelp}
          >
            &#8984;
          </button>
          <button
            className={(informationVisible) ? styles.footerButtonActive : styles.footerButton}
            onClick={this.toggleInformation}
          >
            i
          </button>
          <div className={styles.footerContent}>
            {/* CTRL: &#8963; */}
            {(this.state.shortcutHelpVisible) && (
              <div>
                <h4 className={styles.footerHeading}>Keyboard Shortcuts</h4>
                <p className={styles.paragraph}>
                  {/* TODO Dynamically inject this from the ReactPlugin */}
                  <code className={styles.keyboardShortcut}>ESC</code>
                  {'Toggle Nav / Close Modal'}
                </p>
                <p className={styles.paragraph}>
                  <code className={styles.keyboardShortcut}>&#8984;+&#8679;+&#x2193;</code>
                  {'Next Component'}
                </p>
                <p className={styles.paragraph}>
                  <code className={styles.keyboardShortcut}>&#8984;+&#8679;+&#x2191;</code>
                  {'Prev Component'}
                </p>
              </div>
            )}
            {(this.state.informationVisible) && (
              <div>
                <h4 className={styles.footerHeading}>About</h4>
                <p className={styles.paragraph}>
                  Made by
                  <a className={styles.footerLink} href="https://twitter.com/mxstbr"> Max Stoiber</a>,
                  <a className={styles.footerLink} href="https://twitter.com/nikgraf"> Nik Graf</a>,
                  <a className={styles.footerLink} href="https://twitter.com/jantimon"> Jan Nicklas </a>
                  and collaborators.
                </p>
                <p className={styles.paragraph}>
                  Submit bug reports and contribute on <a className={styles.footerLink} href="https://github.com/">Github</a>!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
