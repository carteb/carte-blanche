import React from 'react';
import Navigation from './Navigation';

class ComponentPage extends React.Component {
  render() {
    const componentData = window.components[this.props.location.pathname.replace(/\//, '')];
    const Component = componentData.component;
    return (
      <div>
        <Navigation />
        <Component />
      </div>
    );
  }
}

export default ComponentPage;
