import React, { Component, PropTypes } from 'react';
import style from './itemStyles';

/**
 * Belle internal component to wrap an Option in a ComboBox.
 *
 * This component exists to avoid binding functions in JSX.
 */
export default class ComboBoxItem extends Component {

  static displayName = 'ComboBoxItem';

  static propTypes = {
    children: PropTypes.node.isRequired,
    index: PropTypes.number.isRequired,
    onItemClick: PropTypes.func.isRequired,
    onItemMouseEnter: PropTypes.func.isRequired,
    onItemMouseLeave: PropTypes.func.isRequired,
  };

  static contextTypes = {
    isHoveredIndex: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.number,
    ]),
  };

  static defaultProps = {
    isDisplayedAsSelected: false,
  };

  onClick = () => {
    this.props.onItemClick(this.props.index);
  };

  onMouseEnter = () => {
    this.props.onItemMouseEnter(this.props.index);
  };

  onMouseLeave = () => {
    this.props.onItemMouseLeave();
  };

  onMouseDown = (event) => {
    event.preventDefault();
  };

  render() {
    let optionStyle;

    if (this.props.isDisplayedAsSelected) {
      optionStyle = style.selectStyle;
    } else {
      optionStyle = style.style;
      if (this.context.isHoveredIndex === this.props.index) {
        optionStyle = {
          ...optionStyle,
          ...style.hoverStyle,
        };
      }
    }

    return (
      <li
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseDown={this.onMouseDown}
        role="option"
        style={optionStyle}
      >
        {this.props.children}
      </li>
    );
  }
}
