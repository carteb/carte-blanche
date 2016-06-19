import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducers';
import PlaygroundList from './components/PlaygroundList';
import IFrameDataManager from './components/common/IFrameDataManager';
import normalizeMetaInfo from './utils/normalizeMetaInfo';

export default class playground extends React.Component {
  constructor() {
    super();
    this.store = createStore(reducer);
  }

  render() {
    const {
      frontendData,
      pluginData,
      Component,
      componentPath,
      navigationStore,
    } = this.props;
    const options = frontendData.options;

    if (window.frameElement) {
      // in frame
      return <IFrameDataManager component={Component} />;
    }

    return (
      <Provider store={this.store}>
        <PlaygroundList
          hostname={options.hostname}
          port={options.port}
          dest={JSON.parse(pluginData.dest)}
          commonsChunkFilename={JSON.parse(pluginData.commonsChunkFilename)}
          userFiles={frontendData.files}
          injectTags={options.injectTags}
          componentPath={componentPath}
          component={Component}
          navigationStore={navigationStore}
          variationBasePath={options.variationBasePath}
          meta={normalizeMetaInfo(pluginData.reactDocs)}
        />
      </Provider>
    );
  }
}
