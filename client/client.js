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
const styleguideClientApi = window.__STYLEGUIDE_PLUGIN_CLIENT_API;

// Generate a view for every component
const routeViews = {};
Object.keys(styleguideClientApi.scripts).forEach((componentName) => {
  routeViews[componentName] = React.createClass({
    render() {
      return (<ComponentPreview
        name={componentName}
      />);
    },
  });
});

// Generate a route for every view
const routes = Object.keys(routeViews)
    .map((componentName) => (
      <Route
        key={componentName}
        path={componentName}
        component={routeViews[componentName]}
      />
    ));

ReactDOM.render(
  <Router history={ hashHistory }>
    <Route path="/" component={App}>
      { routes }
    </Route>
  </Router>,
  document.getElementById('styleguide-root')
);
