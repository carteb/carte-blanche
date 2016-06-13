/* @flow weak */
import React from 'react';
import {
  Grid,
  Row,
} from 'react-bootstrap';

import {
  Button,
} from '../components';

const Root = () =>
  <Grid>
    <Row>
      <Button>Here is a sample button</Button>
    </Row>
    <Row>
      <Button bsStyle="primary">Here is a primary button</Button>
    </Row>
  </Grid>;

export default Root;
