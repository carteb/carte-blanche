import React from 'react';
import Select from '../../../../common/Select';

const TYPE_OPTIONS = [
  {
    value: 'both',
    label: 'Both',
  }, {
    value: 'firstOnly',
    label: 'First name only',
  }, {
    value: 'lastOnly',
    label: 'Last name only',
  },
];

const defaultConstraints = {
  type: TYPE_OPTIONS[0],
};

export default ({ constraints = {}, onUpdate }) => {
  const {
    type = defaultConstraints.type,
  } = constraints;

  const updateType = (evt) => {
    onUpdate({ type: evt.target.value });
  };

  return (
    <div>
      <Select
        label="Type"
        options={TYPE_OPTIONS}
        onChange={updateType}
        value={type}
      />
    </div>
  );
};
