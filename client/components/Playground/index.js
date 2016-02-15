import React from 'react';

class Playground extends React.Component {

  render() {
    return (
      <div>
        <h2>Playground</h2>
        {(this.props.meta.props) ? (
          Object.keys(this.props.meta.props).map((name) => {
            return (
              <div>{ name }</div>
            );
          })
        ) : null}
      </div>
    );
  }
}

export default Playground;
