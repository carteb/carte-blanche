import React from 'react';
import PlaygroundWrapper from './components/Playground/Wrapper';
import normalizeMetaInfo from './utils/normalizeMetaInfo';

export default function playground(options, data, Component) {
  return (
    <PlaygroundWrapper
      component={Component}
      meta={normalizeMetaInfo(data.reactDocs)}
    />
  );
}
