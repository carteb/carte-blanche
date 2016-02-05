import React from 'react';
import PropTypesInfo from './PropTypesInfo';
import { GLOBAL_NAME } from '../constants';

class ComponentPage extends React.Component {
  render() {
    const key = this.props.location.pathname.replace(/\//, '');
    const componentData = window[GLOBAL_NAME][key];
    const Component = componentData.component();
    return (
      <div>
        <Component />
        <PropTypesInfo meta={componentData.meta} />
      </div>
    );
  }
}

export default ComponentPage;
