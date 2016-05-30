/**
 * BooleanControl
 *
 * Renders an input which allows you to modify a certain property of type boolean
 */

import React from 'react';
import randomValue from './randomValue';
import Row from '../../../form/Grid/Row';
import LeftColumn from '../../../form/Grid/LeftColumn';
import RightColumn from '../../../form/Grid/RightColumn';
import AtriumInput from '../../../form/AtriumInput';
import Label from '../../../form/Label';
import BooleanInput from '../../../form/BooleanInput';

const BooleanControl = (props) => {
  const { label, value, onUpdate, secondaryLabel, nestedLevel, required } = props;
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
          <AtriumInput
            value={value}
            fallbackValue
            onChange={onUpdate}
            hasRandomButton
            hasSettings={!required}
            inputComponent={BooleanInput}
            onRandomButtonClick={() => onUpdate({ value: BooleanControl.randomValue(props) })}
          />
        </div>
      </RightColumn>
    </Row>
  );
};

/**
 * Generates a random boolean value
 */
BooleanControl.randomValue = randomValue;

export default BooleanControl;
