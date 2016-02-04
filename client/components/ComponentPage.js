import React from 'react';

class ComponentPage extends React.Component {
  render() {
    const key = this.props.location.pathname.replace(/\//, '');
    const componentData = window.__STYLEGUIDE_PLUGIN_COMPONENTS_DO_NOT_TOUCH__[key];
    const Component = componentData.component;
    return (
      <div>
        <Component />
      </div>
    );
  }
}

export default ComponentPage;
