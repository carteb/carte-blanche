import React, { cloneElement } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import range from 'lodash/range';
import first from 'lodash/first';
import randomValue from './randomValue';
import getControl from '../../../../utils/getControl';
import ConstraintsForm from './ConstraintsForm';
import Row from '../../../form/Grid/Row';
import LeftColumn from '../../../form/Grid/LeftColumn';
import RightColumn from '../../../form/Grid/RightColumn';
import Label from '../../../form/Label';
import Button from '../../../form/Button';
import RandomButton from '../../../form/RandomButton';
import SettingsButton from '../../../form/SettingsButton';

const ArrayControl = (props) => {
  const {
    label,
    secondaryLabel,
    onUpdate,
    value,
    propTypeData,
    isNested,
  } = props;

  const size = props.value === null || typeof props.value === 'undefined' ? 0 : props.value.length;
  const rangeArray = range(size);

  const onUpdateEntry = (data, index) => {
    const newValue = cloneDeep(value);
    newValue[index] = data;
    onUpdate({ value: newValue });
  };

  // override propTypeData. make sure required is set to true
  const requiredPropTypeData = { ...propTypeData, required: true };
  const addItem = () => ({ value: [...value || [], first(ArrayControl.randomValue(requiredPropTypeData))] }); // eslint-disable-line max-len
  const removeItem = () => ({ value: size > 0 ? [...value.slice(0, size - 1)] : [] });

  const control = getControl(propTypeData.value);

  return (
    <Row>
      <LeftColumn>
        <Label
          type={secondaryLabel}
          propKey={label}
        />
      </LeftColumn>
      <RightColumn>
        <div style={{ padding: '0 0.5em', textAlign: 'right' }}>
          <SettingsButton
            groupType={'left'}
            onClick={() => onUpdate({ value: ArrayControl.randomValue(propTypeData) })}
          />
          <Button
            groupType="center"
            onClick={() => onUpdate(removeItem())}
            disabled={size > 0}
          >
            -
          </Button>
          <Button
            onClick={() => onUpdate(addItem())}
            groupType="center"
          >
            +
          </Button>
          <RandomButton
            onClick={() => onUpdate({ value: ArrayControl.randomValue(propTypeData) })}
          />
        </div>
      </RightColumn>
      <Row>
        {rangeArray && rangeArray.map((index) => {
          const newProps = {
            key: index,
            value: value[index],
            onUpdate: (data) => onUpdateEntry(data.value, index),
            isNested: true,
          };
          return (
            <div style={{ marginBottom: '1rem' }}>
              {cloneElement(control, newProps)}
            </div>
          );
        })}
      </Row>
    </Row>
  );
};

ArrayControl.randomValue = randomValue;
/**
 * The form to manage the types of the array's children.
 */
ArrayControl.ConstraintsForm = ConstraintsForm;


export default ArrayControl;
