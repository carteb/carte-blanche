/**
 * FlowObjectControl
 *
 * Renders an information field mentioning that this property can't be generated.
 */

import renderControls from '../../../../utils/renderControls';
import React from 'react';
import normalizeProps from './normalizeProps';
import randomValue from './randomValue';
import Row from '../../../form/Grid/Row';
import LeftColumn from '../../../form/Grid/LeftColumn';
import RightColumn from '../../../form/Grid/RightColumn';
import Label from '../../../form/Label';
import RandomButton from '../../../form/RandomButton';
import SettingsButton from '../../../form/SettingsButton';
import BaseSettings from '../../../form/BaseSettings';
import Dropdown from '../../../form/Dropdown';

class FlowObjectControl extends React.Component {

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
      value,
      onUpdate,
      nestedLevel,
      required,
    } = this.props;

    const hasSettings = true;

    const updatePropertyValues = (values) => {
      onUpdate({ value: values });
    };

    const normalizedPropsWithControls = normalizeProps(propTypeData.signature.properties);

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
              onClick={() => onUpdate({ value: FlowObjectControl.randomValue(propTypeData) })}
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

FlowObjectControl.randomValue = randomValue;

export default FlowObjectControl;
