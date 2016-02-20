import React from 'react';
import range from 'lodash/range';
import cloneDeep from 'lodash/cloneDeep';
import RandomButton from '../RandomButton';
import valueOrNullOrUndefined from '../utils/valueOrNullOrUndefined';
import renderArrayControls from './renderArrayControls';
import getControl from '../utils/getControl';

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

  // TODO test array of array of number

  // TODO fix this for multiples ones
  const control = getControl(propTypeData.elements[0]);

  return (
    <div>
      <label>{ label } [</label>
      <RandomButton
        onClick={ () => onUpdate({ value: FlowArrayControl.randomValue(propTypeData) }) }
      />
        <div style={{ paddingLeft: 20 }}>
          { renderArrayControls(control, rangeArray, value, onUpdateEntry) }
          {typeof value === 'undefined' ? 'undefined' : null}
          {value === null ? 'null' : null}
        </div>
      <div>]</div>
    </div>
  );
};

FlowArrayControl.randomValue = (props) => {
  const canBeNull = true;
  const canBeUndefined = true;
  const min = 0;
  const max = 4;
  const size = Math.floor(Math.random() * (max - min + 1)) + min;
  const rangeArray = range(min, size);

  // TODO fix this for multiples ones
  const control = getControl(props.elements[0]);

  let value;
  value = rangeArray.map(() => {
    return control.type.randomValue(props);
  });

  return valueOrNullOrUndefined(value, canBeNull, canBeUndefined);
};

export default FlowArrayControl;
