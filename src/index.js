import React from 'react';
import ReactDOM from 'react-dom';
import cube from './cube.gif';
import Button from './components/button';

ReactDOM.render(
  <div>
    Hello World: { cube }
    <Button />
  </div>,
  document.getElementById('root')
);
