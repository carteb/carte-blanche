/**
 * FlowObjectControl
 *
 * Renders an information field mentioning that this property can't be generated.
 */

import renderControls from '../utils/renderControls';
import getControl from '../utils/getControl';
import React from 'react';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import randomValues from '../utils/randomValues';
import valueOrNullOrUndefined from '../utils/valueOrNullOrUndefined';
import RandomButton from '../RandomButton';

const normalizeProps = (props) => {
  const propsObject = keyBy(props, 'key');
  const normalizedProps = mapValues(propsObject, (prop) => prop.value);
  return mapValues(normalizedProps, (prop) => {
    prop.control = getControl(prop);
    return prop;
  });
};

const FlowObjectControl = ({ label, propTypeData, value, onUpdate }) => {
  const updatePropertyValues = (values) => {
    onUpdate({ value: values });
  };

  const normalizedPropsWithControls = normalizeProps(propTypeData.signature.properties);

  // TODO test array of array of number

  return (
    <div>
      <div>
        {label ? '${label}:' : null} {'{'}
        <RandomButton
          onClick={ () => onUpdate({ value: FlowObjectControl.randomValue(propTypeData) }) }
        />
      </div>
      <div style={{ paddingLeft: 20 }}>
        { renderControls(normalizedPropsWithControls, value, updatePropertyValues) }
      </div>
      <div>{'}'}</div>
    </div>
  );
};

FlowObjectControl.randomValue = (propTypeData) => {
  const canBeNull = true;
  const canBeUndefined = true;
  const normalizedPropsWithControls = normalizeProps(propTypeData.signature.properties);
  const value = randomValues(normalizedPropsWithControls);
  return valueOrNullOrUndefined(value, canBeNull, canBeUndefined);
};

export default FlowObjectControl;
