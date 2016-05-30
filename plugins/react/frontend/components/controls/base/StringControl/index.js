import React from 'react';
import randomValue from './randomValue';
import Row from '../../../form/Grid/Row';
import LeftColumn from '../../../form/Grid/LeftColumn';
import RightColumn from '../../../form/Grid/RightColumn';
import AtriumInput from '../../../form/AtriumInput';
import Label from '../../../form/Label';

const StringControl = (props) => {
  const { label, value, onUpdate, secondaryLabel, nestedLevel } = props;
  return (
    <Row>
      <LeftColumn nestedLevel={nestedLevel}>
        <Label
          type={secondaryLabel}
          propKey={label}
        />
      </LeftColumn>
      <RightColumn>
        <div style={{ padding: '0 0.5em' }}>
          <AtriumInput
            value={value}
            fallbackValue=""
            onChange={onUpdate}
            hasRandomButton
            hasSettings
            onRandomButtonClick={() => onUpdate({ value: StringControl.randomValue(props) })}
          />
        </div>
      </RightColumn>
    </Row>
  );
};

StringControl.randomValue = randomValue;

export default StringControl;
