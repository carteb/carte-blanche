/**
 * IntegerControl
 *
 * Renders an input which allows you to modify a certain property of type integer
 */

import React from 'react';
import ConstraintsForm from './ConstraintsForm';
import randomValue from './randomValue';
import Row from '../../../form/Grid/Row';
import LeftColumn from '../../../form/Grid/LeftColumn';
import RightColumn from '../../../form/Grid/RightColumn';
import AtriumInput from '../../../form/AtriumInput';
import Label from '../../../form/Label';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';

const IntegerControl = (props) => {
  const { label, value, onUpdate, isNested, secondaryLabel } = props;
  const onChange = (data) => {
    const val = data.value;
    const parsedValue = isUndefined(val) || isNull(val) ? val : parseInt(val, 10);
    onUpdate({ value: parsedValue });
  };
  return (
    <Row>
      <LeftColumn>
        <Label
          type={secondaryLabel}
          propKey={label}
        />
      </LeftColumn>
      <RightColumn>
        <div style={{ padding: '0 0.5em' }}>
          <AtriumInput
            value={value}
            fallbackValue={0}
            onChange={onChange}
            hasRandomButton
            hasSettings
            type="number"
            onRandomButtonClick={() => onUpdate({ value: IntegerControl.randomValue(props) })}
          />
        </div>
      </RightColumn>
    </Row>
  );
};

/**
 * Generates a random integer
 */
IntegerControl.randomValue = randomValue;

/**
 * The form to manage the types of the constraints.
 */
IntegerControl.ConstraintsForm = ConstraintsForm;

export default IntegerControl;
