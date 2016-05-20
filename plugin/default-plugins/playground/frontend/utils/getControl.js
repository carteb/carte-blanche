/**
 * getControl
 *
 * @param  {object} propType The propType we want the control for
 * @return {component}       The rendered control for the propType
 */

import React from 'react';
import BooleanControl from '../components/controls/base/BooleanControl';
import IntegerControl from '../components/controls/base/IntegerControl';
import ArrayControl from '../components/controls/base/ArrayControl';
import StringControl from '../components/controls/base/StringControl';
import EnumControl from '../components/controls/base/EnumControl';
import NodeControl from '../components/controls/base/NodeControl';
import DummyControl from '../components/controls/base/DummyControl';
import FlowObjectControl from '../components/controls/base/FlowObjectControl';
import ObjectControl from '../components/controls/base/ObjectControl';
import FlowArrayControl from '../components/controls/base/FlowArrayControl';
import FlowUnionControl from '../components/controls/base/FlowUnionControl';

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
