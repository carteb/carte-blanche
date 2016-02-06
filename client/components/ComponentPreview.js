/**
 * Showcases a componentn
 */

import React from 'react';
import PropTypesInfo from './PropTypesInfo';
import Examples from './Examples';
import Playground from './Playground';
const styleguideClientApi = window.__STYLEGUIDE_PLUGIN_CLIENT_API;

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
      return (<div/>);
    }

    const componentMeta = this.state.componentData.meta;
    const componentExamples = this.state.componentData.examples;
    const Component = this.state.componentData.component;
    return (
      <div>
        <h2>Preview</h2>
        <Examples
          component={Component}
          examples={componentExamples}
        />
        <PropTypesInfo meta={componentMeta} />
        <Playground
          component={Component}
          meta={componentMeta}
        />
      </div>
    );
  }
}

export default ComponentPreview;
