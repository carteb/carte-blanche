/**
 * Main entry point for the Styleguide Client
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  Router,
  hashHistory
} from 'react-router';
import ComponentPreview from './components/ComponentPreview';
import App from './components/App';
import { STYLEGUIDE } from './constants';

// Generate the routes to the components
const routes =
  Object.keys(window[STYLEGUIDE])
    .map((componentName) => {
      return (
        <Route
          key={componentName}
          path={window[STYLEGUIDE][componentName].path}
          component={ComponentPreview}
        />
      );
    });

ReactDOM.render(
  <Router history={ hashHistory }>
    <Route path="/" component={App}>
      { routes }
    </Route>
  </Router>,
  document.getElementById('styleguide-root')
);
