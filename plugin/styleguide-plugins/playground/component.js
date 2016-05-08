import Playground from './Playground';
import normalizeMetaInfo from './normalizeMetaInfo';

export default function playground(options, data, Component, React) {
  // console.log(data, options);
  return (
    <Playground
      component={Component}
      meta={normalizeMetaInfo(data.reactDocs)}
    />
  );
}
