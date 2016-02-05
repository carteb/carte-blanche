import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  Router,
  hashHistory
} from 'react-router';
import ComponentPage from './components/ComponentPage';
import App from './components/App';

// console.log(JSON.stringify(window.__STYLEGUIDE_PLUGIN_COMPONENTS_DO_NOT_TOUCH__));

// Render the components in the window.__STYLEGUIDE_PLUGIN_COMPONENTS_DO_NOT_TOUCH__ object
const routes =
  Object.keys(window.__STYLEGUIDE_PLUGIN_COMPONENTS_DO_NOT_TOUCH__)
    .map((componentName) => {
      // TODO: Fix replace of file
      return (
        <Route
          key={componentName}
          path={window.__STYLEGUIDE_PLUGIN_COMPONENTS_DO_NOT_TOUCH__[componentName].path}
          component={ComponentPage}
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
