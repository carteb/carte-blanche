/**
 * Renders the frontend plugins of a component
 */

import React from 'react';

class Plugins extends React.Component {
  render() {
    const plugins = this.props.componentData.getMeta();
    let Component = this.props.componentData.getCompiledComponent();
    if (Component.default) {
      Component = Component.default;
    }
    debugger;
    // Get the frontend components of the plugins that have one
    const pluginComponents = plugins
      .filter(plugin => (
        plugin !== undefined && plugin.frontendPlugin !== undefined
      ))
      .map(plugin => (
        <div key={plugin.name}>
          {plugin.frontendPlugin(Component, this.props.componentPath)}
        </div>
      ));
    return (
      <div>
        {pluginComponents}
      </div>
    );
  }
}

export default Plugins;
