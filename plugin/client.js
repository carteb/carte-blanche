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
console.log(React);

const cube = require('./cube.gif');
console.log(cube);

class G {
  constructor(props) {
    // super(props);
    console.log('constructor');
  }

  render() {
    return 'some text';
  }
}

const a = new G();
console.log(a.render());
