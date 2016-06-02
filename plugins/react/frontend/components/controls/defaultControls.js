/**
 * Maps control components to prop/flow types
 */

// Basic Control Components
import BooleanControl from './base/BooleanControl';
import NumberControl from './base/NumberControl';
import ArrayControl from './base/ArrayControl';
import StringControl from './base/StringControl';
import EnumControl from './base/EnumControl';
import NodeControl from './base/NodeControl';
import FlowObjectControl from './base/FlowObjectControl';
import ObjectControl from './base/ObjectControl';
import FlowArrayControl from './base/FlowArrayControl';
import FlowUnionControl from './base/FlowUnionControl';
import FunctionControl from './base/FunctionControl';

// Advanced Control Components
import AvatarControl from './advanced/AvatarControl';
import NameControl from './advanced/NameControl';
import IntegerControl from './advanced/IntegerControl';
import PhoneControl from './advanced/PhoneControl';

const defaultControls = {
  // Basic
  bool: {
    control: BooleanControl,
    nested: false,
  },
  boolean: {
    control: BooleanControl,
    nested: false,
  },
  number: {
    control: NumberControl,
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
  // Flow specific
  signature: {
    control: FlowObjectControl,
    nested: true,
  },
  union: {
    control: FlowUnionControl,
    nested: true,
  },
  func: {
    control: FunctionControl,
    nested: false,
  },
  // Advanced
  avatar: {
    control: AvatarControl,
    nested: false,
  },
  name: {
    control: NameControl,
    nested: false,
  },
  integer: {
    control: IntegerControl,
    nested: false,
  },
  phone: {
    control: PhoneControl,
    nested: false,
  },
};

export default defaultControls;
