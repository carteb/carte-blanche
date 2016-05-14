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
    editMode: false,
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
        variation: `testVariation-${Math.random() * 100}`,
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

  deleteVariation = (variationPath) => {
    fetch(`http://localhost:8000/${this.props.componentPath}?variation=${variationPath}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      this.fetchVariations();
    })
    .catch((err) => {
      // TODO PROPER ERROR HANDLING
      console.trace(err); // eslint-disable-line no-console
    });
  };

  updateVariation = (variationPath, props) => {
    fetch(`http://localhost:8000/${this.props.componentPath}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // TODO use a proper name (think about the UX adding/chaning names)
        variation: `${variationPath}`,
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

  startEditMode = (id) => {
    this.setState({
      editMode: true,
      selected: id,
    });
  };

  closePropForm = () => {
    this.setState({
      editMode: false,
      selected: [],
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
          onCloseClick={this.closePropForm}
          open={this.state.editMode}
        />
        {values(mapValues(this.state.variationPropsList, (variationProps, variationPath) => (
          <div
            className={styles.playgroundWrapper}
            key={variationPath}
          >
            {(this.state.selected.length > 0
              && this.state.selected.indexOf(variationPath) === -1) ? (
              <button
                className={styles.playgroundOverlay}
                onClick={() => {
                  this.selectVariation(variationPath);
                }}
              />
            ) : null}
            <Playground
              big={this.state.editMode}
              component={component}
              variationProps={variationProps}
              variationPath={variationPath}
              onDeleteButtonClick={this.deleteVariation}
              onEditButtonClick={this.startEditMode}
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
