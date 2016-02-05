import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  Router,
  hashHistory
} from 'react-router';
import ComponentPage from './components/ComponentPage';
import App from './components/App';
import { GLOBAL_NAME } from './constants';

// Render the components from the window
const routes =
  Object.keys(window[GLOBAL_NAME])
    .map((componentName) => {
      // TODO: Fix replace of file
      return (
        <Route
          key={componentName}
          path={window[GLOBAL_NAME][componentName].path}
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
