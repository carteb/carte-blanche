import React from 'react';
import mapValues from 'lodash/mapValues';
import BooleanControl from './BooleanControl';
import IntegerControl from './IntegerControl';
import ObjectControl from './ObjectControl';
import StringControl from './StringControl';
import playgroundWrapper from './playgroundWrapper';

class Playground extends React.Component {
  addControl(prop) {
    // In nested prop types, the name is at prop.name
    // normally it's at prop.type.name
    const name = prop.name || prop.type.name;
    let control;
    switch (name) {
      case 'bool':
        control = <BooleanControl />;
        break;
      case 'number':
        control = <IntegerControl />;
        break;
      case 'string':
        control = <StringControl />;
        break;
      case 'shape':
        const value = prop.value || prop.type.value;
        mapValues(value, (innerProp) => {
          innerProp.control = this.addControl(innerProp);
        });
        break;
      default:
        break;
    }
    return control;
  }

  render() {
    const Component = this.props.component;
    let props;
    if (this.props.meta.props) {
      props = mapValues(this.props.meta.props, (prop) => {
        if (!prop.control) {
          prop.control = this.addControl(prop);
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
