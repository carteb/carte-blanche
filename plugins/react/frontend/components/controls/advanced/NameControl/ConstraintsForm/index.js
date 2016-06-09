import React from 'react';
import Row from '../../../../form/Grid/Row';
import LeftColumn from '../../../../form/Grid/LeftColumn';
import RightColumn from '../../../../form/Grid/RightColumn';
import ComboBox from '../../../../form/ComboBox';

const TYPE_OPTIONS = [
  {
    value: 'both',
  },
  {
    value: 'firstOnly',
  },
  {
    value: 'lastOnly',
  },
];

const defaultConstraints = {
  type: TYPE_OPTIONS[0],
};

export default ({ constraints = {}, onUpdate, nestedLevel }) => {
  const {
    type = defaultConstraints.type.value,
  } = constraints;

  const updateType = (evt) => {
    onUpdate({ type: evt.value });
  };

  return (
    <Row>
      <LeftColumn nestedLevel={nestedLevel}>Name Type</LeftColumn>
      <RightColumn>
        <ComboBox
          value={type}
          onChange={updateType}
          options={TYPE_OPTIONS}
        />
      </RightColumn>
    </Row>
  );
};
