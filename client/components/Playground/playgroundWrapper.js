import React from 'react';
import { withState } from 'recompose';
import randomValues from './randomValues';
import renderControls from './renderControls';
import RandomButton from './RandomButton';
import styles from './styles';

/*
 * Returns a higher order component to generated a playground for the provided
 * component & properties.
 */
const playground = (Component, properties, title = 'Playground') => {
  const Wrapper = ({ componentProperties, setComponentProperties, props }) => {
    return (
      <div style={styles.wrapper}>
        <div style={styles.controls}>
          <h2>
            {title}
            <RandomButton onClick={ () => setComponentProperties(randomValues(properties)) }/>
          </h2>
          {renderControls(properties, componentProperties, setComponentProperties)}
        </div>
        <Component {...props} {...componentProperties}/>
      </div>
    );
  };

  const values = randomValues(properties);
  return withState('componentProperties', 'setComponentProperties', values, Wrapper);
};

export default playground;
