/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import cube from './cube.gif';
import Button from './components/Button.jsx';
import Card from './components/Card/index.jsx';
import ImmutableList from './components/ImmutableList';
import Select from './components/Select';
import Godzilla from './components/Godzilla';
import Ghidorah from './components/Ghidorah';
import Nested from './components/Nested/index.jsx';

ReactDOM.render(
  <div>
    Hello World: {cube}
    <Button>Click Me</Button>
    <Card />
    <ImmutableList />
    <Select />
    <Godzilla />
    <Ghidorah />
    <Nested name={'Ada'} />
  </div>,
  document.getElementById('root')
);
