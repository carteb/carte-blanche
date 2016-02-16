import React from 'react';
import renderControls from '../utils/renderControls';

const NestedArrayControls = (propTypeData, rangeArray, value, onUpdateEntry) => {
  return (
    <div>
      { rangeArray && rangeArray.map((index) => {
        const onUpdate = (data) => {
          return onUpdateEntry(data, index);
        };

        return (
          <div key={ index }>
            { renderControls(propTypeData.value, value[index], onUpdate) }
          </div>
        );
      })}
    </div>
  );
};

export default NestedArrayControls;
