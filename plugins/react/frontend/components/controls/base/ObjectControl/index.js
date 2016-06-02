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

  onCloseSettings = () => {
    this.setState({
      settingsActive: false,
    });
  };

  render() {
    const {
      label,
      secondaryLabel,
      propTypeData,
      customMetaData = {},
      value,
      onUpdate,
      nestedLevel,
      required,
    } = this.props;

    const hasSettings = true;

    const updatePropertyValues = (values) => {
      onUpdate({ value: values });
    };

    const normalizedPropsWithControls = mapValues(propTypeData.value, (prop, key) => {
      const nestedCustomMetaData = customMetaData.constraints.props[key];
      prop.control = getControl(prop, nestedCustomMetaData); // eslint-disable-line no-param-reassign, max-len
      prop.controlType = nestedCustomMetaData && nestedCustomMetaData.controlType; // eslint-disable-line no-param-reassign, max-len
      prop.customMetaData = nestedCustomMetaData; // eslint-disable-line no-param-reassign, max-len
      return prop;
    });

    const onRandomClick = () => {
      onUpdate({
        value: ObjectControl.randomValue({
          ...propTypeData,
          constraints: customMetaData.constraints,
        }),
      });
    };

    return (
      <Row>
        <LeftColumn nestedLevel={nestedLevel}>
          {/* inside arrays there is no label for the object */}
          {(label) && (
            <Label
              type={secondaryLabel}
              propKey={label}
            />
          )}
        </LeftColumn>
        <RightColumn>
          <div style={{ padding: '0 0.5rem', textAlign: 'right' }}>
            {hasSettings && <Dropdown
              active={this.state.settingsActive}
              onClose={this.onCloseSettings}
            >
              <BaseSettings onChange={onUpdate} />
            </Dropdown>}
            {!required && <SettingsButton
              groupType="left"
              onClick={this.onToggleSettings}
            />}
            <RandomButton
              groupType={required ? 'none' : 'right'}
              onClick={onRandomClick}
            />
          </div>
        </RightColumn>
        <Row>
          {renderControls(
            normalizedPropsWithControls,
            value,
            updatePropertyValues,
            nestedLevel + 1
          )}
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
