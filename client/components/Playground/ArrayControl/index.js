import React from 'react';
import range from 'lodash/range';
import cloneDeep from 'lodash/cloneDeep';
import RandomButton from '../RandomButton';
import valueOrNullOrUndefined from '../utils/valueOrNullOrUndefined';
import renderArrayControls from './renderArrayControls';
import getControl from '../utils/getControl';

const ArrayControl = (props) => {
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

  const control = getControl(propTypeData.value);

  return (
    <div>
      <label>{ label } [</label>
      <RandomButton
        onClick={ () => onUpdate({ value: ArrayControl.randomValue(propTypeData) }) }
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

ArrayControl.randomValue = (props) => {
  const canBeNull = true;
  const canBeUndefined = true;
  const min = 0;
  const max = 4;
  const size = Math.floor(Math.random() * (max - min + 1)) + min;
  const rangeArray = range(min, size);
  const propTypeData = props.value || props.type && props.type.value; // TODO clean up
  const control = getControl(propTypeData);

  const value = rangeArray.map(() => {
    return control.type.randomValue(propTypeData);
  });

  return valueOrNullOrUndefined(value, canBeNull, canBeUndefined);
};

export default ArrayControl;
