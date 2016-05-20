import React, { cloneElement } from 'react';
import range from 'lodash/range';
import cloneDeep from 'lodash/cloneDeep';
import RandomButton from '../../common/RandomButton';
import getControl from '../../../utils/getControl';
import randomValue from './randomValue';

const FlowArrayControl = (props) => {
  const {
    label,
    onUpdate,
    value,
    propTypeData,
  } = props;

  const size = props.value === null || typeof props.value === 'undefined' ? 0 : props.value.length;
  const rangeArray = range(size);

  const onUpdateEntry = (data, index) => {
    const newValue = cloneDeep(value);
    newValue[index] = data;
    onUpdate({ value: newValue });
  };

  // TODO fix this for multiples ones
  const control = getControl(propTypeData.elements[0]);

  return (
    <div>
      <label>{label} [</label>
      <RandomButton
        onClick={() => onUpdate({ value: FlowArrayControl.randomValue(propTypeData) })}
      />
      <div style={{ paddingLeft: 20 }}>
        {rangeArray && rangeArray.map((index) => {
          const newProps = {
            key: index,
            value: value[index],
            onUpdate: (data) => onUpdateEntry(data.value, index),
          };
          return cloneElement(control, newProps);
        })}
        {typeof value === 'undefined' ? 'undefined' : null}
        {value === null ? 'null' : null}
      </div>
      <div>]</div>
    </div>
  );
};

FlowArrayControl.randomValue = randomValue;

export default FlowArrayControl;
