import React from 'react';
import ConstraintsForm from './ConstraintsForm';
import Row from '../../../form/Grid/Row';
import LeftColumn from '../../../form/Grid/LeftColumn';
import RightColumn from '../../../form/Grid/RightColumn';
import CarteBlancheInput from '../../../form/CarteBlancheInput';
import Label from '../../../form/Label';
import randomValue from './randomValue';

const NameControl = (props) => {
  const {
    label,
    value,
    onUpdate,
    secondaryLabel,
    nestedLevel,
    required,
    customMetaData = {},
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
          <CarteBlancheInput
            value={value}
            fallbackValue=""
            onChange={onUpdate}
            hasRandomButton
            hasSettings={!required}
            onRandomButtonClick={() => onUpdate({
              value: NameControl.randomValue({
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

NameControl.randomValue = randomValue;
NameControl.ConstraintsForm = ConstraintsForm;

export default NameControl;
