/**
 * FlowObjectControl
 *
 * Renders an information field mentioning that this property can't be generated.
 */

import renderControls from '../../../utils/renderControls';
import getControl from '../../../utils/getControl';
import React from 'react';
import mapValues from 'lodash/mapValues';
import randomValues from '../../../utils/randomValues';
import valueOrNullOrUndefined from '../../../utils/valueOrNullOrUndefined';
import Label from '../../common/Label';

import styles from './styles.css';

const ObjectControl = ({ label, propTypeData, value, onUpdate, isNested }) => {
  const updatePropertyValues = (values) => {
    onUpdate({ value: values });
  };

  const normalizedPropsWithControls = mapValues(propTypeData.value, (prop) => {
    prop.control = getControl(prop); // eslint-disable-line no-param-reassign
    return prop;
  });

  return (
    <div className={styles.wrapper}>
      {/* inside arrays there is no label for the object */}
      <Label
        text={label}
        isNested={isNested}
        onRandomClick={() => onUpdate({ value: ObjectControl.randomValue(propTypeData) })}
      />
      <div className={(isNested) ? styles.nestedDeeperThanOneLevel : styles.nestedControls}>
        {renderControls(normalizedPropsWithControls, value, updatePropertyValues, true)}
      </div>
    </div>
  );
};

ObjectControl.randomValue = (propTypeData) => {
  const canBeNull = true;
  const canBeUndefined = true;
  const normalizedPropsWithControls = mapValues(propTypeData.value, (prop) => {
    prop.control = getControl(prop); // eslint-disable-line no-param-reassign
    return prop;
  });
  const value = randomValues(normalizedPropsWithControls);
  return valueOrNullOrUndefined(value, canBeNull, canBeUndefined);
};

export default ObjectControl;
