/**
 * Renders a single propType
 */

import React from 'react';
import styles from './styles.css';

class PropTypeInfo extends React.Component {
  render() {
    return (
      <div className={ styles.wrapper }>
        <div>{ this.props.name }</div>
        <div>Required: { this.props.data.required ? 'True' : 'False' }</div>
        <div>Type: { this.props.data.name }</div>
      </div>
    );
  }
}

export default PropTypeInfo;
