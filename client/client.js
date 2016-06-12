/**
 * Main entry point for the CarteBlanche Client
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
import FourOhFour from './components/FourOhFour';
import map from 'lodash/map';
import createNavigationStore from './navigationStore';

let rootElement;
window.$INITIALIZE_COMPONENT_GUI = function initializeComponentGui(components) {
  if (rootElement) {
    rootElement.forceUpdate();
    return;
  }

  const navigationStore = createNavigationStore(components);

  // Generate a view per user component that renders the frontend part of the
  // plugins for each component
  const routes = map(components, (component, componentPath) => (
    <Route
      key={componentPath}
      path={componentPath}
      component={() => (
        <Plugins
          componentPath={componentPath}
          componentData={component}
          navigationStore={navigationStore}
        />
      )}
    />
  ));

  const appRoute = (<Route
    path="/"
    component={(props) => (
      <App {...props} navigationStore={navigationStore} />
    )}
  >
    {routes}
  </Route>);

  rootElement = ReactDOM.render(
    (<Router history={hashHistory}>
      {appRoute}
      <Route
        path="*"
        component={(props) => (
          <FourOhFour {...props} navigationStore={navigationStore} />
        )}
      />
    </Router>),
    document.getElementById('carte-blanche-root')
  );
};
