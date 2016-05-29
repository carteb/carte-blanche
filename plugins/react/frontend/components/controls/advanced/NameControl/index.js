import React from 'react';
import ConstraintsForm from './ConstraintsForm';
import Row from '../../../form/Grid/Row';
import LeftColumn from '../../../form/Grid/LeftColumn';
import RightColumn from '../../../form/Grid/RightColumn';
import AtriumInput from '../../../form/AtriumInput';
import Label from '../../../form/Label';
import randomValue from './randomValue';

const NameControl = (props) => {
  const { label, value, onUpdate, isNested, secondaryLabel } = props;
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
            fallbackValue=""
            onChange={onUpdate}
            hasRandomButton
            hasSettings
            onRandomButtonClick={() => onUpdate({ value: NameControl.randomValue(props) })}
          />
        </div>
      </RightColumn>
    </Row>
  );
};

NameControl.randomValue = randomValue;
NameControl.ConstraintsForm = ConstraintsForm;

export default NameControl;
