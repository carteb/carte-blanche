import React, { Component, PropTypes } from 'react';

import InputGroup from '../InputGroup';
import Input from '../Input';
import SettingsButton from '../SettingsButton';
import RandomButton from '../RandomButton';
import Dropdown from '../Dropdown';
import BaseSettings from '../BaseSettings';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';
import styles from './styles.css';

const isNullOrUndefined = (value) => isUndefined(value) || isNull(value);

class CarteBlancheInput extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onRandomButtonClick: PropTypes.func,
    value: PropTypes.any,
    fallbackValue: PropTypes.any.isRequired,
    hasRandomButton: PropTypes.bool,
    hasSettings: PropTypes.bool,
  };

  static defaultProps = {
    inputComponent: Input,
  };

  state = {
    settingsActive: false,
  }

  componentDidUpdate(prevProps) {
    const shouldFocus = isNullOrUndefined(prevProps.value) &&
                        !isNullOrUndefined(this.props.value) &&
                        this.input !== null;
    if (shouldFocus) {
      this.input.focus();
    }
  }

  onChange = ({ value }) => {
    this.props.onChange({ value });
  }

  onChangeToFallback = () => {
    this.props.onChange({ value: this.props.fallbackValue });
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
      hasSettings,
      hasRandomButton,
      onRandomButtonClick,
      value,
      fallbackValue,
      inputComponent,
      ...otherProps,
    } = this.props;
    const settingsGroupType = hasSettings && hasRandomButton ? 'center' : 'right';
    const inputGroupType = hasSettings || hasRandomButton ? 'left' : 'none';
    const inputValue = isUndefined(value) || isNull(value) ? fallbackValue : value;
    const InputComponent = inputComponent;
    return (
      <InputGroup className={styles.root}>
        <div className={styles.inputWrapper}>
          <InputComponent
            {...otherProps}
            groupType={inputGroupType}
            value={inputValue}
            onChange={this.onChange}
            component={this.props.inputComponent}
            ref={(ref) => { this.input = ref; }}
          />
          {isUndefined(value) && <button
            className={styles.isUndefined}
            onClick={this.onChangeToFallback}
          >
            undefined
          </button>}
          {isNull(value) && <button
            className={styles.isNull}
            onClick={this.onChangeToFallback}
          >
            null
          </button>}
        </div>
        {hasSettings && <SettingsButton
          groupType={settingsGroupType}
          onClick={this.onToggleSettings}
        />}
        {hasSettings && <Dropdown
          active={this.state.settingsActive}
          onClose={this.onCloseSettings}
        >
          <BaseSettings onChange={this.onChange} />
        </Dropdown>}
        {hasRandomButton && <RandomButton onClick={onRandomButtonClick} />}
      </InputGroup>
    );
  }
}

export default CarteBlancheInput;
