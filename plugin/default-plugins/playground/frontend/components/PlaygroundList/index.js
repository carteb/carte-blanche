/**
 * Playground Store
 */

import React, { Component, PropTypes } from 'react';
import PlaygroundWrapper from '../Playground/Wrapper';
import mapValues from 'lodash/mapValues';
import values from 'lodash/values';
import 'whatwg-fetch';

class PlaygroundList extends Component {

  state = {
    variations: {},
    loading: false,
  };

  componentWillMount() {
    this.fetchVariations();
  }

  fetchVariations = () => {
    this.setState({
      loading: true,
    });
    // TODO dynamic host
    fetch(`http://localhost:8000/${this.props.componentPath}`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          variations: json.data,
          loading: false,
        });
      }).catch((ex) => {
        // TODO proper error handling
        console.log('parsing failed', ex); // eslint-disable-line no-console
        this.setState({
          loading: false,
        });
      });
  };

  createVariation = (event) => {
    // TODO Optimistic UI update to show currently loaded variations and an "empty"
    // one with a loading indicator
    event.preventDefault();
    // TODO dynamic host
    fetch(`http://localhost:8000/${this.props.componentPath}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // TODO use a proper name (think about the UX adding/chaning names)
        variation: `testVariation-${Math.random() * 100}.js`,
        code: `{
          props: {
            name: {
              value: 'Ada Lovelace',
            },
            onClick: {
              value: () => true,
            },
          },
        };`,
      }),
    })
      .then(() => {
        // TODO only fetch in case there was a 200 response (should we switch to 201?)
        this.fetchVariations();
      }).catch((ex) => {
        // TODO proper error handling
        console.log('parsing failed', ex); // eslint-disable-line no-console
      });
  };

  deleteVariation = () => {
    // TODO create a button and implement delete
  };

  updateVariation = (variationPath, variationCode) => {
    // TODO implement updateVariation
    console.log(variationPath, variationCode); // eslint-disable-line no-console
  };

  render() {
    if (this.state.loading) {
      // TODO Better loading indicator
      return (
        <div>Loading…</div>
      );
    }
    const { component, meta } = this.props;
    return (
      <div>
        {
          // PlaygroundWrapper or Playground should be made ready to work with
          values(mapValues(this.state.variations, (variation, variationId) => (
            <PlaygroundWrapper
              component={component}
              meta={meta}
              variation={variation}
              variationId={variationId}
              key={variationId}
              updateVariation={this.updateVariation}
            />
          )))
        }
        <button
          onClick={this.createVariation}
          type="button"
        >
          Create Variation
        </button>
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
