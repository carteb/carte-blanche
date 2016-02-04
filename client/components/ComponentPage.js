import React from 'react';
import Navigation from './Navigation';

class ComponentPage extends React.Component {
  render() {
    const key = this.props.location.pathname.replace(/\//, '');
    const componentData = window.components[key];
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
