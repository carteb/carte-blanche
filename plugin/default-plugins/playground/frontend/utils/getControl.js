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

const getControl = (propType, propMeta) => {
  const controlType = propMeta && propMeta.controlType ? propMeta.controlType : propType.name;
  const constraints = propMeta && propMeta.constraints ? propMeta.constraints : {};
  const generalProps = {
    // If something is required, don't randomise it to null/undefined
    required: propType.required,
    constraints,
  };

  let control;
  switch (controlType) {
    case 'bool': // proptypes boolean
      control = <BooleanControl {...generalProps} />;
      break;
    case 'boolean': // flow boolean
      control = <BooleanControl {...generalProps} />;
      break;
    case 'number':
      control = <IntegerControl {...generalProps} />;
      break;
    case 'string':
      control = <StringControl {...generalProps} />;
      break;
    case 'enum':
      control = <EnumControl propTypeData={propType} {...generalProps} />;
      break;
    case 'node':
      control = <NodeControl {...generalProps} />;
      break;
    case 'shape': // proptypes
      control = <ObjectControl propTypeData={propType} {...generalProps} />;
      break;
    case 'signature': // flow
      control = <FlowObjectControl propTypeData={propType} {...generalProps} />;
      break;
    case 'arrayOf':
      control = <ArrayControl propTypeData={propType} {...generalProps} />;
      break;
    case 'Array':
      control = <FlowArrayControl propTypeData={propType} {...generalProps} />;
      break;
    case 'union':
      control = <FlowUnionControl propTypeData={propType} {...generalProps} />;
      break;
    default:
      control = <DummyControl />;
      break;
  }
  return control;
};

export default getControl;
