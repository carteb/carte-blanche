/**
 * Showcases a component
 */

import React from 'react';

// import Playground from './Playground'; // TODO
const styleguideClientApi = window.STYLEGUIDE_PLUGIN_CLIENT_API;

class ComponentPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentPath: props.path,
    };
  }

  componentDidMount() {
    this.refreshComponentData = this.refreshComponentData.bind(this);
    styleguideClientApi.on(this.state.componentPath, this.refreshComponentData);
    this.refreshComponentData();
    styleguideClientApi.load(this.state.componentPath);
  }

  componentWillUnmount() {
    styleguideClientApi.off(this.state.componentPath, this.refreshComponentData);
  }

  refreshComponentData() {
    this.setState({
      componentData: styleguideClientApi.cache[this.state.componentPath],
    });
  }

  render() {
    if (!this.state.componentData || !this.state.componentData.meta) {
      return (<div />);
    }

    const componentMeta = this.state.componentData.meta;
    const Component = this.state.componentData.component;
    // TODO Try if filtering first works for early-bail perf reasons
    const componentPlugins = componentMeta
      .map(component => (
        <div key={component.name}>
          {component.frontendPlugin
            && component.frontendPlugin(Component, this.state.componentPath)}
        </div>
      ))
      .filter(component => component !== undefined);
    return (
      <div>
        {componentPlugins}
      </div>
    );
  }
}

// <Playground
//   component={Component}
//   meta={componentMeta}
// />

export default ComponentPreview;
