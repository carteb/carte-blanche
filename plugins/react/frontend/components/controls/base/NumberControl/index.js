/**
 * NumberControl
 *
 * Renders an input which allows you to modify a certain property of type number
 */

import React from 'react';
import ConstraintsForm from './ConstraintsForm';
import randomValue from './randomValue';
import Row from '../../../form/Grid/Row';
import LeftColumn from '../../../form/Grid/LeftColumn';
import RightColumn from '../../../form/Grid/RightColumn';
import CarteBlancheInput from '../../../form/CarteBlancheInput';
import Label from '../../../form/Label';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';

const NumberControl = (props) => {
  const {
    label,
    value,
    onUpdate,
    secondaryLabel,
    nestedLevel,
    required,
    customMetaData = {},
  } = props;
  const onChange = (data) => {
    const val = data.value;
    const parsedValue = isUndefined(val) || isNull(val) ? val : parseInt(val, 10);
    onUpdate({ value: parsedValue });
  };
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
          <CarteBlancheInput
            value={value}
            fallbackValue={0}
            onChange={onChange}
            hasRandomButton
            hasSettings={!required}
            type="number"
            onRandomButtonClick={() => onUpdate({
              value: NumberControl.randomValue({
                ...props,
                constraints: customMetaData.constraints,
              }),
            })}
          />
        </div>
      </RightColumn>
    </Row>
  );
};

/**
 * Generates a random integer
 */
NumberControl.randomValue = randomValue;

/**
 * The form to manage the types of the constraints.
 */
NumberControl.ConstraintsForm = ConstraintsForm;

export default NumberControl;
