/**
 * Main entry point for the Styleguide Client
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  Router,
  hashHistory,
} from 'react-router';
import ComponentPreview from './components/ComponentPreview';
import App from './components/App';
import map from 'lodash/map';

const styleguideClientApi = window.STYLEGUIDE_PLUGIN_CLIENT_API;

// Generate a view for every component
const routes = map(styleguideClientApi.scripts, (value, componentPath) => (
  <Route
    key={componentPath}
    path={componentPath}
    component={() => <ComponentPreview path={componentPath} />}
  />
));

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      {routes}
    </Route>
  </Router>,
  document.getElementById('styleguide-root')
);
