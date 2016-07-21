import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import normalizeMetaInfo from '../../utils/normalizeMetaInfo';
import PlaygroundList from '../PlaygroundList';
import reducer from '../../reducers';
import createSagaMiddleware from 'redux-saga';
import sagas from '../../sagas';

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
    const sagaMiddleware = createSagaMiddleware();
    this.store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(sagas);
  }

  render() {
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
