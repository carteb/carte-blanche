/**
 * FlowObjectControl
 *
 * Renders an information field mentioning that this property can't be generated.
 */

import renderControls from '../utils/renderControls';
import getControl from '../utils/getControl';
import React from 'react';
import mapValues from 'lodash/mapValues';
import randomValues from '../utils/randomValues';
import valueOrNullOrUndefined from '../utils/valueOrNullOrUndefined';
import RandomButton from '../RandomButton';

const ObjectControl = ({ label, propTypeData, value, onUpdate }) => {
  const updatePropertyValues = (values) => {
    onUpdate({ value: values });
  };

  const normalizedPropsWithControls = mapValues(propTypeData.value, (prop) => {
    prop.control = getControl(prop);
    return prop;
  });

  // TODO add random button

  return (
    <div>
      {/* inside arrays there is no label for the object */}
      <div>
        {label ? '${label}:' : null} {'{'}
        <RandomButton
          onClick={ () => onUpdate({ value: ObjectControl.randomValue(propTypeData) }) }
        />
      </div>
      <div style={{ paddingLeft: 20 }}>
        { renderControls(normalizedPropsWithControls, value, updatePropertyValues) }
      </div>
      <div>{'}'}</div>
    </div>
  );
};

ObjectControl.randomValue = (propTypeData) => {
  const canBeNull = true;
  const canBeUndefined = true;
  const normalizedPropsWithControls = mapValues(propTypeData.value, (prop) => {
    prop.control = getControl(prop);
    return prop;
  });
  const value = randomValues(normalizedPropsWithControls);
  return valueOrNullOrUndefined(value, canBeNull, canBeUndefined);
};

export default ObjectControl;
