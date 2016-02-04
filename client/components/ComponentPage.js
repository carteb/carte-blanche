import React from 'react';

class ComponentPage extends React.Component {
  render() {
    const key = this.props.location.pathname.replace(/\//, '');
    const componentData = window.components[key];
    const Component = componentData.component;
    return (
      <div>
        <Component />
      </div>
    );
  }
}

export default ComponentPage;
