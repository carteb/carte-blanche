/**
 * Playground Store
 */

import React, { Component } from 'react';
import mapValues from 'lodash/mapValues';
import find from 'lodash/find';
import values from 'lodash/values';
import 'whatwg-fetch';

import getControl from '../../utils/getControl';
import randomValues from '../../utils/randomValues';
import propsToVariation from '../../utils/propsToVariation';
import variationsToProps from '../../utils/variationsToProps';
import generateKey from '../../utils/generateKey';

import Playground from '../Playground';
import PropForm from '../PropForm';
import Modal from '../Modal';

import styles from './styles.css';

class PlaygroundList extends Component {
  state = {
    variationPropsList: {},
    selected: undefined,
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

        const links = values(mapValues(variationPropsList, (value, key) => (
          {
            title: key,
            id: key,
          }
        )));

        window.STYLEGUIDE_PLUGIN_CLIENT_API.updateNavigation(
          this.props.componentPath,
          'playground-plugin',
          links
        );
      }).catch((ex) => {
        // TODO proper error handling
        console.log('parsing failed', ex); // eslint-disable-line no-console
      });
  };

  createVariation = (event) => {
    // TODO Optimistic UI update to show currently loaded variations and an "empty"
    // one with a loading indicator
    event.preventDefault();
    const code = this.propsToVariation(this.getRandomValues());
    // TODO dynamic host
    fetch(`http://localhost:8000/${this.props.componentPath}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // TODO name should be: v-[key]-[slugify-human-readable-version]
        // Webpack uses md5 as default hashing algorithm & in css modules it is bas64 encoded:
        // https://github.com/webpack/loader-utils/blob/master/index.js#L221
        // The name should start with `v-` in order to whitelist by this pattern.
        // This way system files like .DS_Store will be ignored.
        variation: `v-${generateKey()}`,
        code,
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
      this.setState({
        editMode: false,
      });
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

  randomiseEverything = (path) => {
    this.updateVariation(path, this.getRandomValues());
  };

  selectVariation = (id) => {
    this.setState({
      selected: id,
    });
  };

  startEditMode = (id) => {
    document.body.style.overflow = 'hidden';
    this.setState({
      editMode: true,
      selected: id,
    });
  };

  stopEditMode = () => {
    document.body.style.overflow = '';
    this.setState({
      editMode: false,
    });
  };

  propsToVariation = propsToVariation;
  variationsToProps = variationsToProps;

  render() {
    const { component } = this.props;
    const selectedVariationProps =
      find(
        this.state.variationPropsList,
        (variationProps, key) => this.state.selected === key
      );
    return (
      <div className={styles.wrapper}>
        {/* EDIT MODE MODAL */}
        {(this.state.selected) ? (
          <Modal
            visible={this.state.editMode}
            onCloseClick={this.stopEditMode}
          >
            <div className={styles.modalWrapper}>
              <PropForm
                metadataWithControls={this.state.metadataWithControls}
                onVariationPropsChange={this.updateVariation}
                onRandomClick={this.randomiseEverything.bind(this, this.state.selected)} // eslint-disable-line react/jsx-no-bind,max-len
                open={this.state.editMode}
                variationPath={this.state.selected}
                variationProps={selectedVariationProps}
              />
              <Playground
                component={component}
                fullHeight
                variationProps={selectedVariationProps}
                variationPath={this.state.selected}
              />
            </div>
          </Modal>
        ) : null}
        {/* MAIN AREA WITH PLAYGROUNDS */}
        {values(mapValues(this.state.variationPropsList, (variationProps, variationPath) => (
          <Playground
            key={variationPath}
            component={component}
            variationProps={variationProps}
            variationPath={variationPath}
            onDeleteButtonClick={this.deleteVariation}
            onEditButtonClick={this.startEditMode}
          />
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
