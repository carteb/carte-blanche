import React from 'react';
import renderControls from '../renderControls';

const NestedArrayControls = (control, rangeArray, value, onUpdateEntry) => {
  return (
    <div>
      { rangeArray && rangeArray.map((index) => {
        return (
          <div key={ index }>{ renderControls(control, value[index], onUpdateEntry) }</div>
        );
      })}
    </div>
  );
};

export default NestedArrayControls;
