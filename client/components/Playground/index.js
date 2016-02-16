/**
 * PlaygroundWrapper
 *
 * Composes the playground with UI fuzz testing
 */

import React, { PropTypes } from 'react';
import Playground from './Playground';

import mapValues from 'lodash/mapValues';
import getControl from './utils/getControl';
import { withState } from 'recompose';
import randomValues from './utils/randomValues';

const PlaygroundWrapper = (props) => {
  // Attach controls to propTypes meta information
  let metadataWithControls;
  if (props.meta.props) {
    metadataWithControls = mapValues(props.meta.props, (prop) => {
      if (!prop.control) {
        prop.control = getControl(prop);
      }
      return prop;
    });
  }

  // Generate initial random values for props
  const initialState = randomValues(metadataWithControls);
  const StatefulPlayground = withState('globalComponentProps', 'setGlobalComponentProps', initialState, Playground);
  return (
    <StatefulPlayground
      metadataWithControls={metadataWithControls}
      component={props.component}
    />
  );
};

PlaygroundWrapper.propTypes = {
  meta: PropTypes.shape({
    props: PropTypes.object
  }),
  component: PropTypes.func // TODO Is this really always an function?
};

export default PlaygroundWrapper;
