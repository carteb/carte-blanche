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
import find from 'lodash/find';

if (window.frameElement) {
  // in iframe
  window.$INITIALIZE_COMPONENT_GUI = function initializeComponentGui(components) {
    const componentData = components[window.COMPONENT_PATH];
    let Component = componentData.getCompiledComponent();
    if (Component.default) {
      Component = Component.default;
    }
    const activePlugin = find(componentData.getMeta(), (plugin) => plugin.name === 'react');

    ReactDOM.render(
      (activePlugin.frontendPlugin(Component)),
      document.getElementById('root')
    );
  };
} else {
  let rootElement;
  window.$INITIALIZE_COMPONENT_GUI = function initializeComponentGui(components) {
    if (rootElement) {
      rootElement.forceUpdate();
      return;
    }

    // Generate a view per user component that renders the frontend part of the
    // plugins for each component
    const routes = map(components, (component, componentPath) => (
      <Route
        key={componentPath}
        path={componentPath}
        component={() => <Plugins componentPath={componentPath} componentData={component} />}
      />
    ));

    const appRoute = (<Route
      path="/"
      component={(props) => (<App {...props} components={components} />)}
    >
      {routes}
    </Route>);

    rootElement = ReactDOM.render(
      (<Router history={hashHistory}>
          {appRoute}
      </Router>),
      document.getElementById('styleguide-root')
    );
  };
}
