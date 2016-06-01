import React from 'react';
import PlaygroundList from './components/PlaygroundList';
import IFrameDataManager from './components/common/IFrameDataManager';
import normalizeMetaInfo from './utils/normalizeMetaInfo';

export default function playground(
  frontendData,
  pluginData,
  Component,
  componentPath,
  navigationStore,
) {
  const options = frontendData.options;

  if (window.frameElement) {
    // in frame
    return <IFrameDataManager component={Component} />;
  }

  return (
    <PlaygroundList
      hostname={options.hostname}
      port={options.port}
      userFiles={frontendData.files}
      componentPath={componentPath}
      component={Component}
      navigationStore={navigationStore}
      variationBasePath={options.variationBasePath}
      meta={normalizeMetaInfo(pluginData.reactDocs)}
    />
  );
}
