import React from 'react';
import Playground from './Playground';
import normalizeMetaInfo from './normalizeMetaInfo';

export default function playground(options, data, Component) {
  return (
    <Playground
      component={Component}
      meta={normalizeMetaInfo(data.reactDocs)}
    />
  );
}
