/**
 * EnumControl
 *
 * Renders an input which allows you to select one of the enum options.
 */

import React from 'react';
import Select from '../../../common/Select';
import randomValue from './randomValue';
import Row from '../../../form/Grid/Row';
import LeftColumn from '../../../form/Grid/LeftColumn';
import RightColumn from '../../../form/Grid/RightColumn';
import Label from '../../../form/Label';

const EnumControl = (props) => {
  const {
    label,
    secondaryLabel,
    value,
    propTypeData,
    onUpdate,
    nestedLevel,
  } = props;
  return (
    <Row>
      <LeftColumn nestedLevel={nestedLevel}>
        <Label
          type={secondaryLabel}
          propKey={label}
        />
      </LeftColumn>
      <RightColumn>
        <div style={{ padding: '0 0.5rem' }}>
          <Select
            value={value}
            onChange={(event) => {
              const newValue = event.target.value;
              return onUpdate({ value: newValue });
            }}
            options={propTypeData.value}
            onRandomClick={() => onUpdate({ value: EnumControl.randomValue(propTypeData) })}
          />
        </div>
      </RightColumn>
    </Row>
  );
};

/**
 * Generates a random boolean value
 */
EnumControl.randomValue = randomValue;

export default EnumControl;
