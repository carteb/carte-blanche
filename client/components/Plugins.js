/**
 * Renders the frontend plugins of a component
 */

import React from 'react';

const Plugins = (props) => {
  const plugins = props.componentData.getMeta();
  let Component = props.componentData.getCompiledComponent();
  if (Component.default) {
    Component = Component.default;
  }
  // Get the frontend components of the plugins that have one
  const pluginComponents = plugins
    .filter(plugin => (
      plugin !== undefined && plugin.frontendPlugin !== undefined
    ))
    .map(plugin => (
      <div key={plugin.name}>
        {plugin.frontendPlugin(Component, props.componentPath, props.navigationStore)}
      </div>
    ));
  return (
    <div>
      {pluginComponents}
    </div>
  );
};

export default Plugins;
