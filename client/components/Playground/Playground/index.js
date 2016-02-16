/**
 * Playground
 *
 * The playground with UI fuzz testing
 */


import React, { PropTypes } from 'react';
import styles from './styles';
import renderControls from '../utils/renderControls';
import RandomButton from '../RandomButton';
import randomValues from '../utils/randomValues';

const Playground = (props) => {
  // globalComponentProps and setGlobalComponentProps are injected by recompose's
  // withState() higher order component, additionally pass metadataWithControls
  // and component in order to render the preview and the random value controls
  const {
    globalComponentProps,
    setGlobalComponentProps,
    metadataWithControls
  } = props;
  const Component = props.component;
  return (
    <div style={styles.wrapper}>
      <h2>Playground</h2>
      <div style={styles.controls}>
        <RandomButton onClick={ () => setGlobalComponentProps(randomValues(metadataWithControls)) }/>
        { renderControls(metadataWithControls, globalComponentProps, setGlobalComponentProps) }
      </div>
      <Component {...globalComponentProps} />
    </div>
  );
};

Playground.propTypes = {
  globalComponentProps: PropTypes.object.isRequired,
  setGlobalComponentProps: PropTypes.func.isRequired,
  metadataWithControls: PropTypes.object.isRequired,
  component: PropTypes.func // TODO is this really always a function
};

export default Playground;
