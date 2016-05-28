/**
 * Renders the frontend plugins of a component
 */

import React from 'react';
import has from 'lodash/has';

const styleguideClientApi = window.STYLEGUIDE_PLUGIN_CLIENT_API;

class Plugins extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentPath: props.path,
    };
  }

  componentDidMount() {
    styleguideClientApi.on(this.state.componentPath, this.refreshComponentData);
    this.refreshComponentData();
    styleguideClientApi.load(this.state.componentPath);
  }

  componentWillUnmount() {
    styleguideClientApi.off(this.state.componentPath, this.refreshComponentData);
  }

  refreshComponentData = () => {
    if (has(styleguideClientApi.cache, this.state.componentPath)) {
      this.setState({
        componentData: styleguideClientApi.cache[this.state.componentPath].component,
      });
    }
  };

  render() {
    if (!this.state.componentData || !this.state.componentData.plugins) {
      return (<div />);
    }

    const plugins = this.state.componentData.plugins;
    const Component = this.state.componentData.component;
    // Get the frontend components of the plugins that have one
    const pluginComponents = plugins
      .filter(plugin => (
        plugin !== undefined && plugin.frontendPlugin !== undefined
      ))
      .map(plugin => (
        <div key={plugin.name}>
          {plugin.frontendPlugin(Component, this.state.componentPath)}
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
