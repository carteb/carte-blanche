import React, { Component, PropTypes } from 'react';

import InputGroup from '../InputGroup';
import Input from '../Input';
import Button from '../Button';
import SettingsButton from '../SettingsButton';
import RandomButton from '../RandomButton';
import Dropdown from '../Dropdown';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';
import styles from './styles.css';

const isNullOrUndefined = (value) => isUndefined(value) || isNull(value);

class AtriumInput extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onRandomButtonClick: PropTypes.func,
    value: PropTypes.any,
    fallbackValue: PropTypes.any.isRequired,
    hasRandomButton: PropTypes.bool,
    hasSettings: PropTypes.bool,
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

  onInputChange = (event) => {
    this.props.onChange({ value: event.target.value });
  }

  onChangeToUndefined = () => {
    this.props.onChange({ value: undefined });
  }

  onChangeToNull = () => {
    this.props.onChange({ value: null });
  }

  onChangeToFallback = () => {
    this.props.onChange({ value: this.props.fallbackValue });
  }

  onToggleSettings = () => {
    this.setState({
      settingsActive: !this.state.settingsActive,
    });
  }

  render() {
    const {
      hasSettings,
      hasRandomButton,
      onRandomButtonClick,
      value,
      fallbackValue,
      ...otherProps,
    } = this.props;
    const settingsGroupType = hasSettings && hasRandomButton ? 'center' : 'right';
    const inputGroupType = hasSettings || hasRandomButton ? 'left' : 'none';
    const inputValue = isUndefined(value) || isNull(value) ? fallbackValue : value;
    return (
      <InputGroup>
        <div className={styles.inputWrapper}>
          <Input
            {...otherProps}
            groupType={inputGroupType}
            value={inputValue}
            onChange={this.onInputChange}
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
        >
          <div className={styles.settingsContent}>
            <Button onClick={this.onChangeToUndefined}>
              Set to <span className={styles.highlighted}>undefined</span>
            </Button>
            <Button onClick={this.onChangeToNull}>
              Set to <span className={styles.highlighted}>null</span>
            </Button>
          </div>
        </Dropdown>}
        {hasRandomButton && <RandomButton onClick={onRandomButtonClick} />}
      </InputGroup>
    );
  }
}

export default AtriumInput;
