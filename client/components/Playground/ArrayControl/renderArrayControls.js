import React from 'react';

const ArrayControls = (Control, rangeArray, value, onUpdateEntry, controlRandom) => {
  return (
    <div>
      { rangeArray && rangeArray.map((index) => {
        return (
          <Control key={ index }
                   value={ value[index] }
                   onUpdate={ (data) => onUpdateEntry(data, index) }
                   random={ controlRandom } />
        );
      })}
    </div>
  );
};

export default ArrayControls;
