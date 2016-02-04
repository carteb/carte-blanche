import React from 'react';
import { Link } from 'react-router';

class Navigation extends React.Component {
  componentWillMount() {
    this.components = Object.keys(window.components)
      .map((componentName) => {
        return (<Link to={'/' + componentName}>{componentName}</Link>);
      });
  }

  render() {
    return (
      <div>
        { this.components }
      </div>
    );
  }
}

export default Navigation;
