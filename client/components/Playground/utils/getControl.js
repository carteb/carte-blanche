/**
 * getControl
 *
 * @param  {object} propType The propType we want the control for
 * @return {component}       The rendered control for the propType
 */

import React from 'react';
import BooleanControl from '../BooleanControl';
import IntegerControl from '../IntegerControl';
import ArrayControl from '../ArrayControl';
import StringControl from '../StringControl';
import EnumControl from '../EnumControl';
import NodeControl from '../NodeControl';
import DummyControl from '../DummyControl';
import FlowObjectControl from '../FlowObjectControl';
import ObjectControl from '../ObjectControl';
import FlowArrayControl from '../FlowArrayControl';

const getControl = (propType) => {
  console.log('getControl', propType);
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
      control = <EnumControl propTypeData={ propType } />;
      break;
    case 'node':
      control = <NodeControl />;
      break;
    case 'shape': // proptypes
      control = <ObjectControl propTypeData={ propType } />;
      break;
    case 'signature': // flow
      control = <FlowObjectControl propTypeData={ propType } />;
      break;
    case 'arrayOf':
      control = <ArrayControl propTypeData={ propType } />;
      break;
    case 'Array':
      control = <FlowArrayControl propTypeData={ propType } />;
      break;
    default:
      control = <DummyControl />;
      break;
  }
  return control;
};

export default getControl;
