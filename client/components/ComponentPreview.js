/**
 * Showcases a componentn
 */

import React from 'react';

// import Playground from './Playground'; // TODO
const styleguideClientApi = window.STYLEGUIDE_PLUGIN_CLIENT_API;

class ComponentPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentName: props.name,
    };
  }

  componentDidMount() {
    this.refreshComponentData = this.refreshComponentData.bind(this);
    styleguideClientApi.on(this.state.componentName, this.refreshComponentData);
    this.refreshComponentData();
    styleguideClientApi.load(this.state.componentName);
  }

  componentWillUnmount() {
    styleguideClientApi.off(this.state.componentName, this.refreshComponentData);
  }

  refreshComponentData() {
    this.setState({
      componentData: styleguideClientApi.cache[this.state.componentName],
    });
  }

  render() {
    if (!this.state.componentData || !this.state.componentData.meta) {
      return (<div />);
    }

    const componentMeta = this.state.componentData.meta;
    const Component = this.state.componentData.component;
    const componentPlugins = componentMeta
      .map(component => (
        <div key={component.name}>
          {component.frontendPlugin && component.frontendPlugin(Component, React)}
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
