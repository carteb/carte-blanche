/**
 * getControl
 *
 * @param  {object} propType The propType we want the control for
 * @return {component}       The rendered control for the propType
 */

import React from 'react';
import has from 'lodash/has';
import DummyControl from '../components/controls/base/DummyControl';
import defaultControls from '../components/controls/defaultControls';

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
