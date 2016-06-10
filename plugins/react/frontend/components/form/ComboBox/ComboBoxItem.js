import React, { Component, PropTypes } from 'react';
import styles from './styles.css';

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

  onMouseDown = (event) => {
    event.preventDefault();
  };

  render() {
    let optionClass;

    if (this.props.isDisplayedAsSelected) {
      optionClass = styles.selectStyle;
    } else {
      optionClass = styles.style;
      if (this.context.isHoveredIndex === this.props.index) {
        optionClass += ` ${styles.hoverStyle}`
      }
    }

    return (
      <li
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseDown={this.onMouseDown}
        role="option"
        className={optionClass}
      >
        {this.props.children}
      </li>
    );
  }
}
