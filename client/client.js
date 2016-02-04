import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  Router,
  browserHistory
} from 'react-router';

const routes = [];

class Page extends React.Component {
  render() {
    console.log(window.components[this.props.location.pathname]);
    return (
      <div>Page</div>
    );
  }
}

// Render the components in the window.components object
const renderedComponents =
  Object.keys(window.components)
    .map((componentName) => {
      const Instance = window.components[componentName]().default || window.components[componentName]();
      // TODO: Fix replace of file
      routes.push(
        <Route
          key={componentName}
          path={componentName.replace(/\..*/gi, '')}
          component={Page}
        />
      );
      return (<Instance key={componentName} />);
    });

ReactDOM.render(
  <Router history={ browserHistory }>
    <Route path="/" component={Page}>
      { routes }
    </Route>
  </Router>,
  document.getElementById('styleguide-root')
);
