/**
 * FlowObjectControl
 *
 * Renders an information field mentioning that this property can't be generated.
 */

import renderControls from '../../../../utils/renderControls';
import React from 'react';
import RandomButton from '../../../common/RandomButton';
import normalizeProps from './normalizeProps';
import randomValue from './randomValue';

const FlowObjectControl = ({ label, propTypeData, value, onUpdate }) => {
  const updatePropertyValues = (values) => {
    onUpdate({ value: values });
  };

  const normalizedPropsWithControls = normalizeProps(propTypeData.signature.properties);

  return (
    <div>
      <div>
        {label ? '${label}:' : null} {'{'}
        <RandomButton
          onClick={() => onUpdate({ value: FlowObjectControl.randomValue(propTypeData) })}
        />
      </div>
      <div style={{ paddingLeft: 20 }}>
        {renderControls(normalizedPropsWithControls, value, updatePropertyValues)}
      </div>
      <div>{'}'}</div>
    </div>
  );
};

FlowObjectControl.randomValue = randomValue;

export default FlowObjectControl;
