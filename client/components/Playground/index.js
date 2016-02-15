import React from 'react';
import mapValues from 'lodash/mapValues';
import BooleanControl from './BooleanControl';
import IntegerControl from './IntegerControl';
import StringControl from './StringControl';
import playgroundWrapper from './playgroundWrapper';

class Playground extends React.Component {

  render() {
    const Component = this.props.component;
    let props;
    if (this.props.meta.props) {
      props = mapValues(this.props.meta.props, (prop) => {
        if (!prop.control) {
          switch (prop.type.name) {
            case 'bool':
              prop.control = <BooleanControl />;
              break;
            case 'number':
              prop.control = <IntegerControl />;
              break;
            case 'string':
              prop.control = <StringControl />;
              break;
            default:
              break;
          }
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
