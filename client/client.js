import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  Router,
  hashHistory
} from 'react-router';
import ComponentPage from './components/ComponentPage';
import App from './components/App';

console.log(window.components);

// Render the components in the window.components object
const routes =
  Object.keys(window.components)
    .map((componentName) => {
      // TODO: Fix replace of file
      return (
        <Route
          key={componentName}
          path={componentName}
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
