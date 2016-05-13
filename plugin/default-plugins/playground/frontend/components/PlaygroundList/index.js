/**
 * Playground Store
 */

import React, { Component, PropTypes } from 'react';
import PlaygroundWrapper from '../Playground/Wrapper';
import mapKeys from 'lodash/mapKeys';
import values from 'lodash/values';
import 'whatwg-fetch';

class PlaygroundList extends Component {

  state = {
    variations: {},
  };

  componentWillMount() {
    // TODO dynamic host + dynamic path
    fetch('http://localhost:8000/src/components/Button.js')
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          variations: json.data,
        });
      }).catch((ex) => {
        // TODO proper error handling
        console.log('parsing failed', ex); // eslint-disable-line no-console
      });
  }

  render() {
    const { component, meta } = this.props;
    return (
      <div>
        {
          values(mapKeys(this.state.variations, (variation, variationId) => (
            <PlaygroundWrapper
              component={component}
              meta={meta}
              variation={variation}
              variationId={variationId}
              key={variationId}
            />
          )))
        }

      </div>
    );
  }
}

PlaygroundList.propTypes = {
  meta: PropTypes.shape({
    props: PropTypes.object,
  }),
  component: PropTypes.func, // TODO is this really always a function
};

export default PlaygroundList;
