import React from 'react';

class PropTypeInfo extends React.Component {
  render() {
    return (
      <div>
        <div>{ this.props.name }</div>;
        <div>Required: { this.props.data.required }</div>
        <div>Type: { this.props.data.type.name }</div>
      </div>
    );
  }
}

export default PropTypesInfo;
