/**
 * Showcases a component
 */

import React from 'react';
import has from 'lodash/has';

const styleguideClientApi = window.STYLEGUIDE_PLUGIN_CLIENT_API;

class ComponentPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentPath: props.path,
    };
  }

  componentDidMount() {
    styleguideClientApi.on(this.state.componentPath, this.refreshComponentData);
    this.refreshComponentData();
    if (!has(styleguideClientApi.cache, this.state.componentPath)) {
      styleguideClientApi.load(this.state.componentPath);
    }
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
    if (!this.state.componentData || !this.state.componentData.meta) {
      return (<div />);
    }

    const componentMeta = this.state.componentData.meta;
    const Component = this.state.componentData.component;
    // TODO Try if filtering first works for early-bail perf reasons
    const componentPlugins = componentMeta
      .filter(component => (
        component !== undefined && component.frontendPlugin !== undefined
      ))
      .map(component => (
        <div key={component.name}>
          {component.frontendPlugin(Component, this.state.componentPath)}
        </div>
      ));
    return (
      <div>
        {componentPlugins}
      </div>
    );
  }
}

export default ComponentPreview;
