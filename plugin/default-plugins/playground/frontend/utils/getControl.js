/**
 * getControl
 *
 * @param  {object} propType The propType we want the control for
 * @return {component}       The rendered control for the propType
 */

import React from 'react';
import has from 'lodash/has';
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

const defaultControls = {
  bool: {
    control: BooleanControl,
    nested: false,
  },
  boolean: {
    control: BooleanControl,
    nested: false,
  },
  number: {
    control: IntegerControl,
    nested: false,
  },
  string: {
    control: StringControl,
    nested: false,
  },
  node: {
    control: NodeControl,
    nested: false,
  },
  enum: {
    control: EnumControl,
    nested: true,
  },
  arrayOf: {
    control: ArrayControl,
    nested: true,
  },
  Array: {
    control: FlowArrayControl,
    nested: true,
  },
  shape: {
    control: ObjectControl,
    nested: true,
  },
  signature: {
    control: FlowObjectControl,
    nested: true,
  },
  union: {
    control: FlowUnionControl,
    nested: true,
  },
};

const getControl = (propType, propMeta) => {
  const controlType = propMeta && propMeta.controlType ? propMeta.controlType : propType.name;
  const constraints = propMeta && propMeta.constraints ? propMeta.constraints : {};
  const controlProps = {
    // If something is required, don't randomise it to null/undefined
    required: propType.required,
    constraints,
  };

  if (has(defaultControls, controlType)) {
    const Control = defaultControls[controlType].control;
    controlProps.propTypeData = propType;
    return <Control {...controlProps} />;
  }

  return <DummyControl />;
};

export default getControl;
