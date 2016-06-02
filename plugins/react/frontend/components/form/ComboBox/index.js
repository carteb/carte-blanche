/* eslint-disable max-len */

import React, { Component, PropTypes } from 'react';
import { injectStyles, removeAllStyles } from './inject-style';
import style from './styles';
import ComboBoxItem from './ComboBoxItem';
import Input from '../Input';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import uniqueId from 'lodash/uniqueId';
import styles from './styles.css';

/**
 * Update hover style for the specified styleId.
 *
 * @param caretStyleId {string} - unique is assigned as class to caret span
 * @param props {object} - the components props optionally containing hoverStyle
 */
function updatePseudoClassStyle(caretStyleId) {
  const caretFocusStyle = {
    ...style.caretFocusStyle,
  };

  const legacyStyles = [
    {
      id: caretStyleId,
      style: caretFocusStyle,
      pseudoClass: 'focus',
    },
  ];
  injectStyles(legacyStyles);
}

/**
 * Default function used for filtering options.
 */
function filterFunction(inputValue, optionValue) {
  if (inputValue && optionValue) {
    return optionValue.toString().toLowerCase().indexOf(inputValue.toString().toLowerCase()) > -1;
  }

  return false;
}

/**
 * ComboBox React Component.
 */
export default class ComboBox extends Component {

  static propTypes = {
    options: PropTypes.array,
    value: PropTypes.any,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    tabIndex: PropTypes.number,
    onKeyDown: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    className: PropTypes.string,
    caretClassName: PropTypes.string,
    style: PropTypes.object,
    wrapperStyle: PropTypes.object,
    menuStyle: PropTypes.object,
    focusStyle: PropTypes.object,
    disabledStyle: PropTypes.object,
    disabledHoverStyle: PropTypes.object,
    hoverStyle: PropTypes.object,
    caretToOpenStyle: PropTypes.object,
    caretToCloseStyle: PropTypes.object,
    disabledCaretToOpenStyle: PropTypes.object,
    maxOptions: PropTypes.number,
    filterFunction: PropTypes.func,
    'aria-label': PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    'aria-label': 'ComboBox',
    filterFunction,
    tabIndex: 0,
    children: [],
  };

  static childContextTypes = {
    isHoveredIndex: PropTypes.number,
  };

  /**
   * Function to filter options using input value.
   */
  static filterOptions(inputValue, props) {
    let filteredOptions = props.options;
    if (!isEmpty(props.options)) {
      if (inputValue) {
        filteredOptions = filter(props.options, (entry) => (
          props.filterFunction(inputValue, entry.value)
        ));
      }

      if (props.maxOptions) {
        filteredOptions = filteredOptions.splice(0, props.maxOptions);
      }
    }

    return filteredOptions;
  }

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      focusedOptionIndex: undefined,
      filteredOptions: props.options,
      inputValue: '',
    };
  }

  getChildContext() {
    return {
      isHoveredIndex: this.state.focusedOptionIndex,
    };
  }

  /**
   * Generates the style-id & inject the focus & hover style.
   */
  componentWillMount() {
    const id = uniqueId();
    this.caretStyleId = `caretStyle-id${id}`;
    updatePseudoClassStyle(this.caretStyleId, this.props);
  }

  /**
   * Remove a component's associated styles whenever it gets removed from the DOM.
   */
  componentWillUnmount() {
    removeAllStyles([this.caretStyleId]);
  }

  /**
   * Closed opened combo-box options and removed focusStyles on blur.
   */
  onBlur = (event) => {
    if (!this.props.disabled) {
      this.setState({
        isOpen: false,
        focusedOptionIndex: undefined,
      });
    }

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  /**
   * Set focused state when element is focused.
   */
  onChange = ({ value }) => {
    this.setState({
      filteredOptions: ComboBox.filterOptions(value, this.props),
      inputValue: value,
    });
  };

  /**
   * Set focused state when element is focused.
   */
  onFocus = (event) => {
    if (!this.props.disabled) {
      this.setState({
        isOpen: true,
      });
    }

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  /**
   * Open/ Close menu when create is clicked.
   */
  onCaretClick = () => {
    if (!this.props.disabled) {
      const isOpen = !this.state.isOpen;
      this.setState({
        isOpen,
      });
    }
  };

  /**
   * Update focusedOptionIndex for component when mouse enters an option.
   */
  onMouseEnterAtOption = (index) => {
    if (!this.props.disabled) {
      this.setState({
        focusedOptionIndex: index,
      });
    }
  };

  /**
   * Set focusedOptionIndex to undefined.
   */
  onMouseLeaveAtOption = () => {
    if (!this.props.disabled) {
      this.setState({
        focusedOptionIndex: undefined,
      });
    }
  };

  /**
   * Update component value when an option is clicked.
   */
  onClickAtOption = (index) => {
    if (!this.props.disabled) {
      this.triggerChange(this.getValueForIndex(index));
    }
  };

  /**
   * Handle keyDown in input (when input is focused):
   * 1. ComboBox is closed and ArrowDown/ ArrowUp is pressed -> open the ComboBox
   * 2. ComboBox is opened and ArrowDown is pressed -> highlight next option
   * 3. ComboBox is opened and ArrowUp is pressed -> highlight previous option
   * 5. ComboBox is opened and Enter/ Tab is pressed -> update input value to value of option
   * 6. ComboBox is opened and Esc is pressed -> close ComboBox
   */
  onKeyDown = (event) => {
    if (!this.props.disabled) {
      if (!this.state.isOpen) {
        if (event.key === 'ArrowDown' ||
          event.key === 'ArrowUp') {
          event.preventDefault();
          this.setState({
            isOpen: true,
          });
        }
      } else {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          this.onArrowDownKeyDown();
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          this.onArrowUpKeyDown();
        } else if (event.key === 'Enter') {
          event.preventDefault();
          this.onEnterOrTabKeyDown();
        } else if (event.key === 'Tab') {
          // event.preventDefault(); should not be called here else tab
          // will not be able to take user to next component on the page
          this.onEnterOrTabKeyDown();
        } else if (event.key === 'Escape') {
          event.preventDefault();
          this.setState({
            isOpen: false,
            focusedOptionIndex: undefined,
          });
        }
      }
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  };

  /**
   * Highlight next option when arrowDown key is pressed.
   * Highlight first option if currently last option is focused.
   */
  onArrowDownKeyDown = () => {
    let index = 0;
    if (this.state.focusedOptionIndex !== undefined && (this.state.focusedOptionIndex + 1) < this.state.filteredOptions.length) {
      index = this.state.focusedOptionIndex + 1;
    }

    this.setState({
      focusedOptionIndex: index,
    });
  };

  /**
   * Highlight previous option when arrowUp key is pressed.
   * Highlight last option if currently first option is focused.
   */
  onArrowUpKeyDown = () => {
    if (this.state.filteredOptions.length > 0) {
      let index = this.state.filteredOptions.length - 1;
      if (this.state.focusedOptionIndex) {
        index = this.state.focusedOptionIndex - 1;
      }

      this.setState({
        focusedOptionIndex: index,
      });
    }
  }

  /**
   * Update value of Input box to the value of highlighted option.
   */
  onEnterOrTabKeyDown = () => {
    if (this.state.focusedOptionIndex >= 0) {
      this.triggerChange(this.state.filteredOptions[this.state.focusedOptionIndex].value);
    }
  }

  /**
   * Returns the value of the child with a certain index.
   */
  getValueForIndex = (index) => this.state.filteredOptions[index].value;

  /**
   * The function is called when user selects an option. Function will do following:
   * 1. Close the options
   * 2. Call onChange props function
   */
  triggerChange = (value) => {
    this.setState({
      isOpen: false,
      focusedOptionIndex: undefined,
    });
    const obj = { value, isMatchingOption: true };

    if (this.props.onChange) {
      this.props.onChange(obj);
    }
    this.input.blur();
  }

  render() {
    let inputStyle = {
      ...style.style,
      ...this.props.style,
    };
    const wrapperStyle = {
      ...style.wrapperStyle,
      ...this.props.wrapperStyle,
    };
    const menuStyle = {
      ...style.menuStyle,
      ...this.props.menuStyle,
    };

    const tabIndex = this.props.tabIndex ? this.props.tabIndex : '0';

    if (this.props.disabled) {
      inputStyle = {
        ...inputStyle,
        ...style.disabledStyle,
        ...this.props.disabledStyle,
      };
    }

    // todo: Currently there are no different hover styles for caret, like select they are probably not really needed.
    let caretStyle;
    if (this.props.disabled) {
      caretStyle = {
        ...style.caretToOpenStyle,
        ...this.props.caretToOpenStyle,
        ...style.disabledCaretToOpenStyle,
        ...this.props.disabledCaretToOpenStyle,
      };
    } else if (this.state.isOpen) {
      caretStyle = {
        ...style.caretToCloseStyle,
        ...this.props.caretToCloseStyle,
      };
    } else {
      caretStyle = {
        ...style.caretToOpenStyle,
        ...this.props.caretToOpenStyle,
      };
    }

    const computedMenuStyle = (this.state.isOpen && !this.props.disabled && this.state.filteredOptions && this.state.filteredOptions.length > 0) ? menuStyle : { display: 'none' };

    // using value for input makes it a controlled component and it will be changed in controlled manner if (1) user enters value, (2) user selects some option
    // value will be updated depending on whether user has passed value as property
    return (
      <div
        style={wrapperStyle}
        aria-label={this.props['aria-label']}
        aria-disabled={this.props.disabled}
        className={styles.root}
      >
        <Input
          disabled={this.props.disabled}
          aria-disabled={this.props.disabled}
          value={this.state.inputValue}
          placeholder={this.props.value}
          onChange={this.onChange}
          tabIndex={tabIndex}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onKeyDown={this.onKeyDown}
          aria-autocomplete="list"
          className={styles.input}
          ref={(ref) => { this.input = ref; }}
        />
        <span
          style={caretStyle}
          className={this.caretStyleId}
          onClick={this.onCaretClick}
          tabIndex={-1}
        />

        <ul
          className={styles.menu}
          style={computedMenuStyle}
          role="listbox"
          aria-expanded={this.state.isOpen}
        >
          {
            map(this.state.filteredOptions, (entry, index) => ((
              <ComboBoxItem
                key={index}
                index={index}
                onItemClick={this.onClickAtOption}
                onItemMouseEnter={this.onMouseEnterAtOption}
                onItemMouseLeave={this.onMouseLeaveAtOption}
              >
                {entry.value}
              </ComboBoxItem>
            )))
          }
        </ul>
      </div>
    );
  }
}
