/**
 * ObjectControl
 *
 * Renders an information field mentioning that this property can't be generated.
 */

import renderControls from '../../../../utils/renderControls';
import getControl from '../../../../utils/getControl';
import React from 'react';
import mapValues from 'lodash/mapValues';
import randomValue from './randomValue';
import ConstraintsForm from './ConstraintsForm';
import Row from '../../../form/Grid/Row';
import LeftColumn from '../../../form/Grid/LeftColumn';
import RightColumn from '../../../form/Grid/RightColumn';
import Label from '../../../form/Label';
import RandomButton from '../../../form/RandomButton';
import SettingsButton from '../../../form/SettingsButton';
import BaseSettings from '../../../form/BaseSettings';
import Dropdown from '../../../form/Dropdown';

class ObjectControl extends React.Component {

  state = {
    settingsActive: false,
  }

  onToggleSettings = () => {
    this.setState({
      settingsActive: !this.state.settingsActive,
    });
  }

  render() {
    const { label, secondaryLabel, propTypeData, value, onUpdate, isNested } = this.props;

    const hasSettings = true;

    const updatePropertyValues = (values) => {
      onUpdate({ value: values });
    };

    const normalizedPropsWithControls = mapValues(propTypeData.value, (prop) => {
      prop.control = getControl(prop); // eslint-disable-line no-param-reassign
      return prop;
    });

    return (
      <Row>
        <LeftColumn>
          {/* inside arrays there is no label for the object */}
          {(label) && (
            <Label
              type={secondaryLabel}
              propKey={label}
            />
          )}
        </LeftColumn>
        <RightColumn>
          <div style={{ padding: '0 0.5em', textAlign: 'right' }}>
            {hasSettings && <Dropdown
              active={this.state.settingsActive}
            >
              <BaseSettings onChange={onUpdate} />
            </Dropdown>}
            <SettingsButton
              groupType="left"
              onClick={this.onToggleSettings}
            />
            <RandomButton
              onClick={() => onUpdate({ value: ObjectControl.randomValue(propTypeData) })}
            />
          </div>
        </RightColumn>
        <Row>
          {renderControls(normalizedPropsWithControls, value, updatePropertyValues, true)}
        </Row>
      </Row>
    );
  }
}

ObjectControl.randomValue = randomValue;

/**
 * The form to manage the types of the object's children.
 */
ObjectControl.ConstraintsForm = ConstraintsForm;

export default ObjectControl;
