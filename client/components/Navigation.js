import React from 'react';
import { Link } from 'react-router';

class Navigation extends React.Component {
  componentWillMount() {
    this.components = Object.keys(window.__STYLEGUIDE_PLUGIN_COMPONENTS_DO_NOT_TOUCH__)
      .map((componentName) => {
        return (
          <Link
            to={'/' + componentName}
            key={'/' + componentName}
            activeClassName="active"
          >
            {componentName}
          </Link>
        );
      });
  }

  render() {
    return (
      <div>
        <Link to="/" activeClassName="active">Home</Link>
        { this.components }
      </div>
    );
  }
}

export default Navigation;
