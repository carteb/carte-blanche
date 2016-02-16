import React from 'react';
import styles from './styles';
import renderControls from '../renderControls';
import RandomButton from '../RandomButton';
import randomValues from '../randomValues';

const Wrapper = (props) => {
  const {
    componentProperties,
    setComponentProperties,
    propsWithControls
  } = props;
  const Component = props.component;
  const values = props.props;
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

export default Wrapper;
