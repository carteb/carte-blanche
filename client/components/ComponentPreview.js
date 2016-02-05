/**
 * Showcases a componentn
 */

import React from 'react';
import PropTypesInfo from './PropTypesInfo';
import { STYLEGUIDE } from '../constants';

class ComponentPreview extends React.Component {
  render() {
    const key = this.props.location.pathname.replace(/\//, '');
    const componentData = window[STYLEGUIDE][key];
    const Component = componentData.component();
    return (
      <div>
        <h2>Preview</h2>
        <Component />
        <PropTypesInfo meta={componentData.meta} />
      </div>
    );
  }
}

export default ComponentPreview;
