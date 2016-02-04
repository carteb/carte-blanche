import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  Router,
  browserHistory
} from 'react-router';

class Page extends React.Component {
  render() {
    const componentData = window.components[this.props.location.pathname.replace(/\//, "")];
    const Component = componentData.component;
    return (
      <div><Component /></div>
    );
  }
}

// Render the components in the window.components object
const routes =
  Object.keys(window.components)
    .map((componentName) => {
      // TODO: Fix replace of file
      return (
        <Route
          key={componentName}
          path={componentName}
          component={Page}
        />
      );
    });

ReactDOM.render(
  <Router history={ browserHistory }>
    <Route path="/" component={Page}>
      { routes }
    </Route>
  </Router>,
  document.getElementById('styleguide-root')
);
