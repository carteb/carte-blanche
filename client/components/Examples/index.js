import React from 'react';

class Examples extends React.Component {
  render() {
    return (
      <div>
        <h2>Examples</h2>
        <div>
          { this.props.examples }
        </div>
      </div>
    );
  }
}

export default Examples;
