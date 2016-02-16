import React, { cloneElement } from 'react';

const ArrayControls = (Control, rangeArray, value, onUpdateEntry) => {
  return (
    <div>
      { rangeArray && rangeArray.map((index) => {
        const props = {
          key: index,
          value: value[index],
          onUpdate: (data) => onUpdateEntry(data, index),
        };
        return cloneElement(Control, props);
      })}
    </div>
  );
};

export default ArrayControls;
