/**
 * Playground Store
 */

import React, { Component } from 'react';
import Playground from '../Playground';
import mapValues from 'lodash/mapValues';
import find from 'lodash/find';
import values from 'lodash/values';
import 'whatwg-fetch';

import getControl from '../../utils/getControl';
import randomValues from '../../utils/randomValues';
import propsToVariation from '../../utils/propsToVariation';
import variationsToProps from '../../utils/variationsToProps';
import PropForm from '../PropForm';
import styles from './styles.css';

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
        const variationPropsList = this.variationsToProps(json.data);
        this.setState({
          variationPropsList,
          selected:
            (this.state.selected.length === 0) ?
            [Object.keys(variationPropsList)[0]] :
            this.state.selected,
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
        code: this.propsToVariation(this.getRandomValues()),
      }),
    })
      .then(() => {
        // TODO only fetch in case there was a 200 response (should we switch to 201?)
        this.fetchVariations();
      }).catch((err) => {
        // TODO proper error handling
        console.log('parsing failed', err); // eslint-disable-line no-console
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
        variation: `${variationPath}.js`,
        code: this.propsToVariation(props),
      }),
    })
    .then(() => {
      this.fetchVariations();
    })
    .catch((err) => {
      // TODO PROPER ERROR HANDLING
      console.trace(err); // eslint-disable-line no-console
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
      find(
        this.state.variationPropsList,
        (variationProps, key) => this.state.selected.indexOf(key) > -1
      );
    return (
      <div className={styles.wrapper}>
        <PropForm
          metadataWithControls={this.state.metadataWithControls}
          variationProps={selectedVariationProps}
          variationPath={this.state.selected[0]}
          onVariationPropsChange={this.updateVariation}
        />
        {values(mapValues(this.state.variationPropsList, (variationProps, variationPath) => (
          <div
            className={styles.playgroundWrapper}
            key={variationPath}
          >
            {(this.state.selected.indexOf(variationPath) === -1) ? (
              <div
                className={styles.playgroundOverlay}
                onClick={() => {
                  this.selectVariation(variationPath);
                }}
              />
            ) : null}
            <Playground
              component={component}
              variationProps={variationProps}
            />
          </div>
        )))}
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
