import React from 'react';
import Navigation from './Navigation';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Navigation />
        { this.props.children }
      </div>
    );
  }
}

export default App;
