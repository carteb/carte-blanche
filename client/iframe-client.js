/**
 * Main entry point for the CarteBlanche iframes
 */

import ReactDOM from 'react-dom';
import find from 'lodash/find';

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
