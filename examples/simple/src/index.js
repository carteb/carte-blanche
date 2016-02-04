import React from 'react';
import ReactDOM from 'react-dom';
import cube from './cube.gif';
import Button from './components/button';
import Card from './components/card';

ReactDOM.render(
  <div>
    Hello World: { cube }
    <Button />
    <Card />
  </div>,
  document.getElementById('root')
);
