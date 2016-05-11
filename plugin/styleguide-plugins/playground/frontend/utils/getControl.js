/**
 * getControl
 *
 * @param  {object} propType The propType we want the control for
 * @return {component}       The rendered control for the propType
 */

import React from 'react';
import BooleanControl from '../components/controls/BooleanControl';
import IntegerControl from '../components/controls/IntegerControl';
import ArrayControl from '../components/controls/ArrayControl';
import StringControl from '../components/controls/StringControl';
import EnumControl from '../components/controls/EnumControl';
import NodeControl from '../components/controls/NodeControl';
import DummyControl from '../components/controls/DummyControl';
import FlowObjectControl from '../components/controls/FlowObjectControl';
import ObjectControl from '../components/controls/ObjectControl';
import FlowArrayControl from '../components/controls/FlowArrayControl';
import FlowUnionControl from '../components/controls/FlowUnionControl';

const getControl = (propType) => {
  let control;
  switch (propType.name) {
    case 'bool': // proptypes boolean
      control = <BooleanControl />;
      break;
    case 'boolean': // flow boolean
      control = <BooleanControl />;
      break;
    case 'number':
      control = <IntegerControl />;
      break;
    case 'string':
      control = <StringControl />;
      break;
    case 'enum':
      control = <EnumControl propTypeData={propType} />;
      break;
    case 'node':
      control = <NodeControl />;
      break;
    case 'shape': // proptypes
      control = <ObjectControl propTypeData={propType} />;
      break;
    case 'signature': // flow
      control = <FlowObjectControl propTypeData={propType} />;
      break;
    case 'arrayOf':
      control = <ArrayControl propTypeData={propType} />;
      break;
    case 'Array':
      control = <FlowArrayControl propTypeData={propType} />;
      break;
    case 'union':
      control = <FlowUnionControl propTypeData={propType} />;
      break;
    default:
      control = <DummyControl />;
      break;
  }
  return control;
};

export default getControl;
