import React from 'react';
import PlaygroundList from './components/PlaygroundList';
import IFrameDataManager from './components/common/IFrameDataManager';
import normalizeMetaInfo from './utils/normalizeMetaInfo';

export default function playground(frontendData, pluginData, Component, componentPath) {
  const options = frontendData.options;

  if (window.frameElement) {
    // in frame
    return <IFrameDataManager component={Component} />;
  }

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
