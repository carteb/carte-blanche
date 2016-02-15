import React from 'react';
import range from 'lodash/range';
import RandomButton from '../RandomButton';
import valueOrNullOrUndefined from '../valueOrNullOrUndefined';
import randomValues from '../randomValues';
import renderNestedArrayControls from './renderNestedArrayControls';
import renderArrayControls from './renderArrayControls';
import isReactComponent from './isReactComponent';

const ArrayControl = (props) => {
  const {
    controlRandom,
    label,
    onUpdate,
    value = [],
    content, // TODO
  } = props;

  return (
    <div>
      <label>{ label } [</label>
      <RandomButton
        onClick={ () => onUpdate({ value: ArrayControl.randomValue(props) }) }
      />
        <div style={{ paddingLeft: 20 }}>
          { value }
        </div>
      <div>]</div>
    </div>
  );

  //
  // const size = props.value !== null && typeof props.value !== 'undefined' ? props.value.length : 0;
  // const rangeArray = range(size);
  //
  // const onUpdateEntry = (data, index) => {
  //   const newValue = value.slice();
  //   newValue[index] = data.value;
  //   onUpdate({ value: newValue });
  // };
  //
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

ArrayControl.randomValue = ({ random = {}, control, controlRandom = {} }) => {
  const {
    canBeNull = true,
    canBeUndefined = true,
    min = 0,
    max = 4,
  } = random;
  const size = Math.floor(Math.random() * (max - min + 1)) + min;
  const rangeArray = range(min, size);

  let value;
  value = rangeArray;
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
