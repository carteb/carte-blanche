import React from 'react';
import toNumber from 'lodash/toNumber';
import Input from '../../../../common/Input';
import Row from '../../../../form/Grid/Row';
import LeftColumn from '../../../../form/Grid/LeftColumn';
import RightColumn from '../../../../form/Grid/RightColumn';

const defaultConstraints = {
  min: 0,
  max: 1000,
};

export default ({ constraints = {}, onUpdate }) => {
  const {
    min = defaultConstraints.min,
    max = defaultConstraints.max,
  } = constraints;

  const updateMin = (evt) => {
    onUpdate({ min: toNumber(evt.target.value) });
  };
  const updateMax = (evt) => {
    onUpdate({ max: toNumber(evt.target.value) });
  };

  return (
    <Row>
      <Row>
        <LeftColumn nestedLevel={1}>Min</LeftColumn>
        <RightColumn>
          <Input
            type="number"
            label=""
            onChange={updateMin}
            value={min}
          />
        </RightColumn>
      </Row>
      <Row>
        {/* TODO nested */}
        <LeftColumn nestedLevel={1}>Max</LeftColumn>
        <RightColumn>
          <Input
            type="number"
            label=""
            onChange={updateMax}
            value={max}
          />
        </RightColumn>
      </Row>
    </Row>
  );
};
