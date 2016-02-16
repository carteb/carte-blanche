/**
 * Playground
 *
 * Renders the playground with UI fuzz testing
 */

import React, { PropTypes } from 'react';
import mapValues from 'lodash/mapValues';
import getControl from './getControl';

import { withState } from 'recompose';
import randomValues from './randomValues';
import renderControls from './renderControls';
import RandomButton from './RandomButton';
import styles from './styles';

/*
 * Returns a higher order component to generated a playground for the provided
 * component & properties.
 */
const Playground = (props) => {
  const Component = props.component;
  let propsWithControls;
  if (props.meta.props) {
    propsWithControls = mapValues(props.meta.props, (prop) => {
      if (!prop.control) {
        prop.control = getControl(prop);
      }

      return prop;
    });
  }

  const Wrapper = (wrapperProps) => {
    const {
      componentProperties,
      setComponentProperties
    } = wrapperProps;
    const values = wrapperProps.props;
    return (
      <div style={styles.wrapper}>
        <h2>Playground</h2>
        <div style={styles.controls}>
          <RandomButton onClick={ () => setComponentProperties(randomValues(propsWithControls)) }/>
          { renderControls(propsWithControls, componentProperties, setComponentProperties) }
        </div>
        <Component {...values} {...componentProperties}/>
      </div>
    );
  };

  const values = randomValues(propsWithControls);
  const StatefulWrapper = withState('componentProperties', 'setComponentProperties', values, Wrapper);
  return <StatefulWrapper />;
};

export default Playground;

Playground.propTypes = {
  meta: PropTypes.shape({
    props: PropTypes.object
  }),
  component: PropTypes.element
};

export default Playground;
