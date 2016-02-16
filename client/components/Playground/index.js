import React from 'react';
import mapValues from 'lodash/mapValues';
import playgroundWrapper from './playgroundWrapper';
import getControl from './getControl';

class Playground extends React.Component {

  render() {
    const Component = this.props.component;
    let props;
    if (this.props.meta.props) {
      props = mapValues(this.props.meta.props, (prop) => {
        if (!prop.control) {
          prop.control = getControl(prop);
        }

        return prop;
      });
    }

    const PlaygroundWrapper = playgroundWrapper(Component, props, 'Fuzz Testing');

    return (
      <div>
        <h2>Playground</h2>
        <PlaygroundWrapper />
      </div>
    );
  }
}

export default Playground;
