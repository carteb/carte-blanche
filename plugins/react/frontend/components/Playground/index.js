import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import normalizeMetaInfo from '../../utils/normalizeMetaInfo';
import PlaygroundList from '../PlaygroundList';
import reducer from '../../reducers';

export default class Playground extends Component {
  constructor(props) {
    super(props);
    const {
      frontendData,
      pluginData,
    } = props;
    const initialState = {
      options: frontendData.options,
      files: frontendData.files,
      pluginData: {
        commonsChunkFilename: JSON.parse(pluginData.commonsChunkFilename),
        meta: normalizeMetaInfo(pluginData.reactDocs),
        dest: JSON.parse(pluginData.dest),
      },
    };
    this.store = createStore(reducer, initialState);
  }

  render() {
    console.log(this.props);
    const {
      Component: propComponent,
      componentPath,
      navigationStore,
    } = this.props;

    return (
      <Provider store={this.store}>
        <PlaygroundList
          component={propComponent}
          componentPath={componentPath}
          navigationStore={navigationStore}
        />
      </Provider>
    );
  }
}
