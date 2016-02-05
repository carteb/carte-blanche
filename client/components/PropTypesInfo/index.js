import React from 'react';

class PropTypesInfo extends React.Component {
  render() {
    return (
      <div>
        <h2>Props</h2>
        { Object.keys(this.props.meta.props).map((key) => {
          return <div key={ key }>{ key }</div>;
        }) }
      </div>
    );
  }
}

export default PropTypesInfo;
