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
import Plugins from './components/Plugins';
import App from './components/App';
import map from 'lodash/map';

const styleguideClientApi = window.STYLEGUIDE_PLUGIN_CLIENT_API;

// Generate a view per user component that renders the frontend part of the
// plugins for each component
const routes = map(styleguideClientApi.scripts, (value, componentPath) => (
  <Route
    key={componentPath}
    path={componentPath}
    component={() => <Plugins path={componentPath} />}
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
