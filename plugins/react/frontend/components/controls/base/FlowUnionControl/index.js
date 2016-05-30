/**
 * FlowUnionControl
 *
 * Renders an information field mentioning that this property can't be generated.
 */

import React, { cloneElement } from 'react';
import getControl from '../../../../utils/getControl';
import randomValue from './randomValue';
import Row from '../../../form/Grid/Row';
import LeftColumn from '../../../form/Grid/LeftColumn';
import RightColumn from '../../../form/Grid/RightColumn';
import Label from '../../../form/Label';

const FlowUnionControl = (props) => {
  const {
    label,
    propTypeData,
    value,
    onUpdate,
    nestedLevel,
    secondaryLabel,
  } = props;
  let clonedControl;
  if (typeof value === 'undefined' || value === null) {
    clonedControl = `${value}`;
  } else {
    const currentControl = getControl({ name: (typeof value) });
    const subControlProps = {
      label: undefined, // TODO cleanup
      value,
      onUpdate: (data) => onUpdate({ value: data.value }),
    };
    clonedControl = cloneElement(currentControl, subControlProps);
  }

  return (
    <Row>
      <LeftColumn nestedLevel={nestedLevel}>
        <Label
          type={secondaryLabel}
          propKey={label}
        />
      </LeftColumn>
      <RightColumn>
        <div style={{ float: 'right' }}>
          <select
            value={typeof value}
            onChange={(event) => {
              const newTypeName = event.target.value;
              const control = getControl({ name: newTypeName });
              return onUpdate({ value: control.type.randomValue({}) });
            }}
          >
            {propTypeData.elements.map((type, index) => (
              <option
                value={type.name}
                key={index}
              >
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          {clonedControl}
        </div>
      </RightColumn>
    </Row>
  );
};

FlowUnionControl.randomValue = randomValue;

export default FlowUnionControl;
