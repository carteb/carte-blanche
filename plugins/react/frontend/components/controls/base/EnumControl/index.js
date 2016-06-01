/**
 * EnumControl
 *
 * Renders an input which allows you to select one of the enum options.
 */

import React from 'react';
import map from 'lodash/map';
import randomValue from './randomValue';
import Row from '../../../form/Grid/Row';
import LeftColumn from '../../../form/Grid/LeftColumn';
import RightColumn from '../../../form/Grid/RightColumn';
import Label from '../../../form/Label';
import CarteBlancheInput from '../../../form/CarteBlancheInput';
import ComboBox from '../../../form/ComboBox';

const EnumControl = (props) => {
  const {
    label,
    secondaryLabel,
    value,
    propTypeData,
    onUpdate,
    nestedLevel,
    required,
  } = props;

  const options = map(propTypeData.value, (entry) => (
    { ...entry, value: eval(entry.value) }  // eslint-disable-line no-eval
  ));

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
            fallbackValue={propTypeData.value[0]}
            onChange={onUpdate}
            inputComponent={ComboBox}
            options={options}
            hasRandomButton
            hasSettings={!required}
            onRandomButtonClick={() => onUpdate({ value: EnumControl.randomValue(propTypeData) })}
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
