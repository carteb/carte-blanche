import React from 'react';
import { IndexLink } from 'react-router';

import styles from './styles.css';

class Navigation extends React.Component {
  componentWillMount() {
    this.components = Object.keys(window.__STYLEGUIDE_PLUGIN_COMPONENTS_DO_NOT_TOUCH__)
      .map((componentName) => {
        return (
          <IndexLink
            to={'/' + componentName}
            key={'/' + componentName}
            className={ styles.componentLink }
            activeClassName={ styles.componentLinkActive }
          >
            {componentName}
          </IndexLink>
        );
      });
  }

  render() {
    return (
      <div className={ styles.drawer }>
        <h2
          className={ styles.title }
        >
          Components
        </h2>
        <div className={ styles.list }>
          <IndexLink
            to="/"
            className={ styles.componentLink }
            activeClassName={ styles.componentLinkActive }
          >
            Home
          </IndexLink>
          { this.components }
        </div>
      </div>
    );
  }
}

export default Navigation;
