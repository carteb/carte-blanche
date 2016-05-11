import React, { cloneElement } from 'react';
import range from 'lodash/range';
import cloneDeep from 'lodash/cloneDeep';
import Label from '../../common/Label';
import valueOrNullOrUndefined from '../../../utils/valueOrNullOrUndefined';
import getControl from '../../../utils/getControl';

import inputStyles from '../../common/Input/styles.css';
import objectControlStyles from '../ObjectControl/styles.css';

const ArrayControl = (props) => {
  const {
    label,
    onUpdate,
    value,
    propTypeData,
    isNested,
  } = props;

  const size = props.value === null || typeof props.value === 'undefined' ? 0 : props.value.length;
  const rangeArray = range(size);

  const onUpdateEntry = (data, index) => {
    const newValue = cloneDeep(value);
    newValue[index] = data;
    onUpdate({ value: newValue });
  };

  const control = getControl(propTypeData.value);

  return (
    <div className={inputStyles.wrapper}>
      <Label
        text={label}
        onRandomClick={() => onUpdate({ value: ArrayControl.randomValue(propTypeData) })}
      />
      <div
        className={
          (isNested) ?
          objectControlStyles.nestedDeeperThanOneLevel :
          objectControlStyles.nestedControls
        }
      >
        {rangeArray && rangeArray.map((index) => {
          const newProps = {
            key: index,
            value: value[index],
            onUpdate: (data) => onUpdateEntry(data.value, index),
            isNested: true,
          };
          return cloneElement(control, newProps);
        })}
      </div>
    </div>
  );
};

ArrayControl.randomValue = (props) => {
  const canBeNull = true;
  const canBeUndefined = true;
  const min = 0;
  const max = 4;
  const size = Math.floor(Math.random() * (max - min + 1)) + min;
  const rangeArray = range(min, size);
  const propTypeData = props.value || props.type && props.type.value; // TODO clean up
  const control = getControl(propTypeData);

  const value = rangeArray.map(() => control.type.randomValue(propTypeData));

  return valueOrNullOrUndefined(value, canBeNull, canBeUndefined);
};

export default ArrayControl;
