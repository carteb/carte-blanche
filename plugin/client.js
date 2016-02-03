// import React from 'react';
// import ReactDOM from 'react-dom';
//
// ReactDOM.render(
//   <div>
//     This is your Styleguide
//   </div>,
//   document.getElementById('styleguide-root')
// );

console.log('Works');

const printMore = require('./test');
// import printMore from './test';
printMore();

const React = require('react');
const ReactDOM = require('react-dom');
console.log(React);

const cube = require('./cube.gif');
console.log(cube);

class G extends React.Component {
  constructor(props) {
    super(props);
    console.log('constructor');
  }

  render() {
    console.log('render');
    return (
      React.createElement('p', null, 'Text Content')
    );
  }
}

ReactDOM.render(React.createElement(G), document.getElementById('styleguide-root'));
