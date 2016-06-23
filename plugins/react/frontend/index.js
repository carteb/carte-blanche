import React from 'react';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';

// import reducer from './reducers';
// import PlaygroundList from './components/PlaygroundList';
import IFrameDataManager from './components/common/IFrameDataManager';
import normalizeMetaInfo from './utils/normalizeMetaInfo';

export default class playground extends React.Component {
  constructor(props) {
    super(props);
    console.log('here');
    const initialState = {
      options: props.frontendData.options,
      files: props.frontendData.files,
      pluginData: {
        commonsChunkFilename: JSON.parse(props.pluginData.commonsChunkFilename),
        meta: normalizeMetaInfo(props.pluginData.reactDocs),
        dest: JSON.parse(props.pluginData.dest),
      },
    };
    console.log('another one', initialState);
    // this.store = createStore(reducer, initialState);
  }

  render() {
    const {
      Component,
      componentPath,
      navigationStore,
    } = this.props;

    console.log(this.store);

    if (window.frameElement) {
      // in frame
      return <IFrameDataManager component={Component} />;
    }

    return null;

    // return (
    //   <Provider store={this.store}>
    //     <PlaygroundList
    //       component={Component}
    //       componentPath={componentPath}
    //       navigationStore={navigationStore}
    //     />
    //   </Provider>
    // );
  }
}
