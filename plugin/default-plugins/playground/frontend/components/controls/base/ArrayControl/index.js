import React, { cloneElement } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import range from 'lodash/range';
import randomValue from './randomValue';
import Label from '../../../common/Label';
import getControl from '../../../../utils/getControl';
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
    <div className={objectControlStyles.wrapper}>
      <Label
        text={label}
        onRandomClick={() => onUpdate({ value: ArrayControl.randomValue(propTypeData) })}
      />
      {(size !== 0) && (
        <div
          className={
            (isNested) ?
            objectControlStyles.nestedControls :
            objectControlStyles.wrapper
          }
          style={{
            paddingLeft: '1rem',
          }}
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
      )}
    </div>
  );
};

ArrayControl.randomValue = randomValue;

export default ArrayControl;
