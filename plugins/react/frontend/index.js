import React from 'react';
import 'babel-polyfill';

import Playground from './components/Playground';
import IFrameDataManager from './components/common/IFrameDataManager';

export default function pluginFrontend(
  frontendData,
  pluginData,
  Component,
  componentPath,
  navigationStore,
) {
  if (window.frameElement) {
    // in frame
    return <IFrameDataManager component={Component} />;
  }

  return (
    <Playground
      frontendData={frontendData}
      pluginData={pluginData}
      Component={Component}
      componentPath={componentPath}
      navigationStore={navigationStore}
    />
  );
}
