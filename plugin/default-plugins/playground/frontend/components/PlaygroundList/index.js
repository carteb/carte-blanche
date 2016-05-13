/**
 * Playground Store
 */

import React, { Component } from 'react';
import Playground from '../Playground';
import mapValues from 'lodash/mapValues';
import values from 'lodash/values';
import 'whatwg-fetch';

import getControl from '../../utils/getControl';
import randomValues from '../../utils/randomValues';
import propsToVariation from '../../utils/propsToVariation';
import variationsToProps from '../../utils/variationsToProps';
import PropForm from '../PropForm';

class PlaygroundList extends Component {
  state = {
    variationPropsList: {},
    selected: [],
    metadataWithControls: null,
  };

  componentWillMount() {
    this.generateMetadataWithControls();
    this.fetchVariations();
  }

  getRandomValues = () => randomValues(this.state.metadataWithControls);

  generateMetadataWithControls = () => {
    const { meta } = this.props;
    // Attach controls to propTypes meta information
    let metadataWithControls;
    if (meta.props) {
      metadataWithControls = mapValues(meta.props, (prop) => {
        if (!prop.control) {
          prop.control = getControl(prop); // eslint-disable-line no-param-reassign
        }

        return prop;
      });
    }

    this.setState({
      metadataWithControls,
    });
  };

  fetchVariations = () => {
    // TODO dynamic host
    fetch(`http://localhost:8000/${this.props.componentPath}`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          variationPropsList: this.variationsToProps(json.data),
        });
      }).catch((ex) => {
        // TODO proper error handling
        console.log('parsing failed', ex); // eslint-disable-line no-console
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
        code: this.propsToVariation(this.randomValues()),
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

  updateVariation = (variationPath, props) => {
    // TODO implement updateVariation
    fetch(`http://localhost:8000/${this.props.componentPath}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // TODO use a proper name (think about the UX adding/chaning names)
        variation: variationPath,
        code: this.propsToVariation(props),
      }),
    });
  };

  selectVariation = (id) => {
    this.setState({
      selected: [id],
    });
  };

  propsToVariation = propsToVariation;
  variationsToProps = variationsToProps;

  render() {
    const { component } = this.props;
    const selectedVariationProps =
      this.state.variationPropsList
        .find((variationProps, key) => this.state.selected.indexOf(key) > -1);
    return (
      <div>
        <PropForm
          metadataWithControls={this.state.metadataWithControls}
          variationProps={selectedVariationProps}
          variationPath={this.state.selected[0]}
          onVariationPropsChange={this.updateVariation}
        />
        { // Wrapper or Playground should be made ready to work with
          values(mapValues(this.state.variations, (variation, variationPath) => (
            <Playground
              component={component}
              variationProps={selectedVariationProps}
              key={variationPath}
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

export default PlaygroundList;
