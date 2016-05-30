import React from 'react';
import PlaygroundList from './components/PlaygroundList';
import normalizeMetaInfo from './utils/normalizeMetaInfo';

export default function playground(frontendData, pluginData, Component, componentPath) {
  const options = frontendData.options;
  return (
    <PlaygroundList
      hostname={options.hostname}
      port={options.port}
      componentPath={componentPath}
      component={Component}
      variationBasePath={options.variationBasePath}
      meta={normalizeMetaInfo(pluginData.reactDocs)}
    />
  );
}
