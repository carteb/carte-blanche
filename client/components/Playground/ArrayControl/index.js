import React from 'react';
import range from 'lodash/range';
import RandomButton from '../RandomButton';
import valueOrNullOrUndefined from '../utils/valueOrNullOrUndefined';
import randomValues from '../utils/randomValues';
import renderNestedArrayControls from './renderNestedArrayControls';
import renderArrayControls from './renderArrayControls';
import isReactComponent from './isReactComponent';
import getControl from '../utils/getControl';

const ArrayControl = (props) => {
  const {
    label,
    onUpdate,
    value,
    innerProps,
  } = props;

  const size = props.value === null || typeof props.value === 'undefined' ? 0 : props.value.length;
  const rangeArray = range(size);

  const onUpdateEntry = (data, index) => {
    const newValue = value.slice();
    newValue[index] = data.value;
    onUpdate({ value: newValue });
  };

  const propValue = innerProps.value || innerProps.type && innerProps.type.value;
  const control = getControl(propValue);

  return (
    <div>
      <label>{ label } [</label>
      <RandomButton
        onClick={ () => onUpdate({ value: ArrayControl.randomValue(innerProps) }) }
      />
        <div style={{ paddingLeft: 20 }}>
          { renderArrayControls(control, rangeArray, value, onUpdateEntry) }
          {typeof value === 'undefined' ? 'undefined' : null}
          {value === null ? 'null' : null}
        </div>
      <div>]</div>
    </div>
  );

  // return (
  //   <div>
  //     <label>{ label } [</label>
  //     <RandomButton onClick={ () => onUpdate({ value: ArrayControl.randomValue(props) }) }/>
  //     <div style={{ paddingLeft: 20 }}>
  //       { isReactComponent(props.control) ?
  //         renderArrayControls(props.control, rangeArray, value, onUpdateEntry, controlRandom) :
  //         renderNestedArrayControls(props.control, rangeArray, value, onUpdateEntry) }
  //     </div>
  //     {typeof value === 'undefined' ? 'undefined' : null}
  //     {value === null ? 'null' : null}
  //     <div>]</div>
  //   </div>
  // );
};

ArrayControl.randomValue = (props) => {
  const canBeNull = true;
  const canBeUndefined = true;
  const min = 0;
  const max = 4;

  const size = Math.floor(Math.random() * (max - min + 1)) + min;
  const rangeArray = range(min, size);

  const propValue = props.value || props.type && props.type.value;
  const control = getControl(propValue);

  let value;
  value = rangeArray.map(() => {
    return control.type.randomValue(propValue);
  });

  // if (!isReactComponent(control)) {
  //   value = rangeArray.map(() => {
  //     return randomValues(control);
  //   });
  // } else {
  //   value = rangeArray.map(() => {
  //     return control.randomValue({ random: controlRandom });
  //   });
  // }

  return valueOrNullOrUndefined(value, canBeNull, canBeUndefined);
};

export default ArrayControl;
