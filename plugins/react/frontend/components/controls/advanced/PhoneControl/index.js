import React from 'react';
import Row from '../../../form/Grid/Row';
import LeftColumn from '../../../form/Grid/LeftColumn';
import RightColumn from '../../../form/Grid/RightColumn';
import CarteBlancheInput from '../../../form/CarteBlancheInput';
import Label from '../../../form/Label';
import randomValue from './randomValue';

const PhoneControl = (props) => {
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
          <CarteBlancheInput
            value={value}
            fallbackValue=""
            onChange={onUpdate}
            hasRandomButton
            hasSettings={!required}
            type="number"
            onRandomButtonClick={() => onUpdate({ value: PhoneControl.randomValue(props) })}
          />
        </div>
      </RightColumn>
    </Row>
  );
};

PhoneControl.randomValue = randomValue;

export default PhoneControl;
