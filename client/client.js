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
const styleguideClientApi = window.STYLEGUIDE_PLUGIN_CLIENT_API;

// Generate a view for every component
const routeViews = {};
Object.keys(styleguideClientApi.scripts).forEach((componentPath) => {
  routeViews[componentPath] = () => (
    <ComponentPreview
      name={componentPath}
    />
  );
});

// Generate a route for every view
const routes = Object.keys(routeViews)
    .map((componentPath) => (
      <Route
        key={componentPath}
        path={componentPath}
        component={routeViews[componentPath]}
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
