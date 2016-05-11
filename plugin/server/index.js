/* eslint-disable */
console.log('\n\n\n\n---------------------------------------');
console.log('START SERVER');
console.log('---------------------------------------\n\n\n\n');

const express = require('express');
const app = express();

app.listen(8000);

app.get('/:component', (req, res) => {
  res.status(200).send('GET ' + req.params.component);
});

app.post('/:component', (req, res) => {
  res.status(200).send('POST ' + req.params.component);
});
