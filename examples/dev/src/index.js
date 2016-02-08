import React from 'react';
import ReactDOM from 'react-dom';
import cube from './cube.gif';
import Button from './components/button';
import Card from './components/card';
import ImmutableList from './components/immutableList';
import Select from './components/select';

ReactDOM.render(
  <div>
    Hello World: { cube }
    <Button />
    <Card />
  </div>,
  document.getElementById('root')
);
