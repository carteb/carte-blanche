/**
 * Playground
 *
 * Renders the playground with UI fuzz testing
 */
import React, { PropTypes } from 'react';
import Wrapper from './Wrapper';

import mapValues from 'lodash/mapValues';
import getControl from './utils/getControl';
import { withState } from 'recompose';
import randomValues from './utils/randomValues';

const Playground = (props) => {
  // Attach controls to propTypes meta information
  let propsWithControls;
  if (props.meta.props) {
    propsWithControls = mapValues(props.meta.props, (prop) => {
      if (!prop.control) {
        prop.control = getControl(prop);
      }
      return prop;
    });
  }

  // Generate initial random values for props
  const values = randomValues(propsWithControls);
  const StatefulWrapper = withState('componentProperties', 'setComponentProperties', values, Wrapper);
  return (
    <StatefulWrapper
      propsWithControls={propsWithControls}
      component={props.component}
    />
  );
};

Playground.propTypes = {
  meta: PropTypes.shape({
    props: PropTypes.object
  }),
  component: PropTypes.func // TODO Is this really always an function?
};

export default Playground;
