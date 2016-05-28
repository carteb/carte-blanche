/**
 * FlowObjectControl
 *
 * Renders an information field mentioning that this property can't be generated.
 */

import renderControls from '../../../../utils/renderControls';
import React from 'react';
import Label from '../../../common/Label';
import normalizeProps from './normalizeProps';
import randomValue from './randomValue';
import styles from '../ObjectControl/styles.css';

const FlowObjectControl = ({ label, propTypeData, value, onUpdate, isNested }) => {
  const updatePropertyValues = (values) => {
    onUpdate({ value: values });
  };

  const normalizedPropsWithControls = normalizeProps(propTypeData.signature.properties);

  let controlWrapperClassName = styles.nestedControls;
  if (!label && isNested) {
    controlWrapperClassName = styles['nestedDeeperThanOneLevel--without-label'];
  } else if (isNested) {
    controlWrapperClassName = styles.nestedDeeperThanOneLevel;
  }

  return (
    <div className={styles.wrapper}>
      {/* inside arrays there is no label for the object */}
      {(label) && (
        <Label
          text={label}
          isNested={isNested}
          onRandomClick={() => onUpdate({
            value: FlowObjectControl.randomValue(propTypeData),
          })}
        />
      )}
      <div className={controlWrapperClassName}>
        {renderControls(normalizedPropsWithControls, value, updatePropertyValues, true)}
      </div>
    </div>
  );
};

FlowObjectControl.randomValue = randomValue;

export default FlowObjectControl;
