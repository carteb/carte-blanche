/* global io */
/**
 * Playground Store
 */

import React, { Component } from 'react';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import find from 'lodash/find';
import debounce from 'lodash/debounce';
import 'whatwg-fetch';
import getSlug from 'speakingurl';

import getControl from '../../utils/getControl';
import randomValues from '../../utils/randomValues';
import propsToVariation from '../../utils/propsToVariation';
import variationsToProps from '../../utils/variationsToProps';
import codeToCustomMetadata from '../../utils/codeToCustomMetadata';
import customMetadataToCode from '../../utils/customMetadataToCode';
import getComponentNameFromPath from '../../../../../../utils/getComponentNameFromPath';

import Playground from '../Playground';
import PropForm from '../PropForm';
import Modal from '../Modal';
import CreateVariationButton from '../common/CreateVariationButton';
import CustomMetadataForm from '../CustomMetadataForm';

import styles from './styles.css';

const PERSISTENCE_DELAY = 1000;

class PlaygroundList extends Component {
  state = {
    variationPropsList: {},
    variationEditMode: false,
    customMetadataEditMode: false,
    selectedVariationId: undefined,
    customMetadata: undefined,
    metadataWithControls: null,
    createVariationError: '',
    loadingMetadata: true,
    loadingVariations: true,
  };

  componentWillMount() {
    this.debouncedPersistVariation = debounce(
      (variationPath, props) => { this.persistVariation(variationPath, props); },
      PERSISTENCE_DELAY
    );
    this.debouncedPersistCustomMetadata = debounce(
      (customMetadata) => { this.persistCustomMetadata(customMetadata); },
      PERSISTENCE_DELAY
    );

    this.fetchMetadata();
    this.fetchVariations();
    this.connectToSocket();
  }

  componentWillUnmount() {
    this.disconnectFromSocket();
  }

  onComponentMetadataChanged = (event) => {
    const { data } = event;
    this.generateMetadataWithControls(data);
  };

  onComponentVariationChanged = (event) => {
    const { data: { name, props } } = event;
    this.updateVariation(name.toLowerCase(), props);
  };

  getRandomValues = () => randomValues(this.state.metadataWithControls);

  getDataFromProps = (data) => {
    const {
      props,
      name,
    } = data;
    // Generate a human-readable JSON string from the props
    const propsString = propsToVariation(props);
    // Add the name to the data we save
    return propsString.replace(/^(\s*){/, `$1{\n  "name": "${name}",`);
  };

  fetchMetadata = () => {
    // TODO dynamic host
    fetch(`http://localhost:8000/components/${this.props.componentPath}`)
      .then((response) => response.json())
      .then((json) => {
        const customMetadata = codeToCustomMetadata(json.data);
        this.generateMetadataWithControls(customMetadata);
      }).catch((ex) => {
        // TODO proper error handling
        console.error('meta data parsing failed', ex); // eslint-disable-line no-console
      });
  };

  generateMetadataWithControls = (customMetadata) => {
    const { meta } = this.props;

    // Attach controls to propTypes meta information
    let metadataWithControls;
    if (meta.props) {
      metadataWithControls = mapValues(meta.props, (prop, propKey) => {
        const newProp = { ...prop };
        const propMeta = customMetadata && customMetadata.props && customMetadata.props[propKey];
        newProp.control = getControl(newProp, propMeta);
        return newProp;
      });
    }

    this.setState({
      metadataWithControls,
      customMetadata,
      loadingMetadata: false,
    });
  };

  connectToSocket = () => {
    // TODO dynamic host
    this.socket = io.connect('http://localhost:8000');
    this.socket.on('componentMetadataChanged', this.onComponentMetadataChanged);
    this.socket.on('componentVariationChanged', this.onComponentVariationChanged);
    this.socket.on('componentVariationAdded', this.fetchVariations);
    this.socket.on('componentVariationRemoved', this.fetchVariations);
  };

  disconnectFromSocket = () => {
    if (this.socket) {
      this.socket.disconnect();
    }
  };

  fetchVariations = () => {
    // TODO dynamic host
    fetch(`http://localhost:8000/variations/${this.props.componentPath}`)
      .then((response) => response.json())
      .then((json) => {
        const variationPropsList = variationsToProps(json.data);
        this.setState({
          variationPropsList,
          loadingVariations: false,
        });

        const links = map(variationPropsList, (variation, key) => (
          {
            title: variation.name,
            id: key,
          }
        ));

        window.STYLEGUIDE_PLUGIN_CLIENT_API.updateNavigation(
          this.props.componentPath,
          'playground-plugin',
          links
        );
      }).catch((ex) => {
        // TODO proper error handling
        console.error('parsing failed', ex); // eslint-disable-line no-console
      });
  };

  createVariation = (name) => {
    const slug = getSlug(name);
    if (this.state.variationPropsList[`${slug}`] !== undefined) {
      this.setState({
        createVariationError: `A variation with the name ${name} already exists.`,
      });
      return;
    }
    this.setState({
      createVariationError: '',
    });
    const data = this.getDataFromProps({
      props: this.getRandomValues(),
      name,
    });
    // TODO dynamic host
    fetch(`http://localhost:8000/variations/${this.props.componentPath}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        variation: `${slug}`,
        code: data,
      }),
    })
      .then(() => {
        // TODO only fetch in case there was a 200 response (should we switch to 201?)
        this.fetchVariations();
      }).catch((err) => {
        // TODO proper error handling
        console.error('parsing failed', err); // eslint-disable-line no-console
      });
  };

  deleteVariation = (variationPath) => {
    fetch(`http://localhost:8000/variations/${this.props.componentPath}?variation=${variationPath}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      this.setState({
        variationEditMode: false,
      });
      this.fetchVariations();
    })
    .catch((err) => {
      // TODO PROPER ERROR HANDLING
      console.trace(err); // eslint-disable-line no-console
    });
  };

  persistVariation = (variationPath, props) => {
    const data = this.getDataFromProps({
      props,
      name: this.state.variationPropsList[variationPath].name,
    });
    fetch(`http://localhost:8000/variations/${this.props.componentPath}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        variation: variationPath,
        code: data,
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

  updateCustomMetadata = (customMetadata) => {
    this.generateMetadataWithControls(customMetadata);
    // Persist changes to server every PERSISTENCE_TIMEOUT milliseconds
    this.debouncedPersistCustomMetadata(customMetadata);
  }

  persistCustomMetadata = (customMetadata) => {
    fetch(`http://localhost:8000/components/${this.props.componentPath}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: customMetadataToCode(customMetadata),
      }),
    })
    // Unnecessary since this happens now via sockets
    // .then(() => {
    //   this.fetchVariations();
    // })
    .catch((err) => {
      // TODO PROPER ERROR HANDLING
      console.trace(err); // eslint-disable-line no-console
    });
  };

  updateVariation = (variationPath, props) => {
    // Update changes locally for snappy UI
    this.setState({
      variationPropsList: {
        ...this.state.variationPropsList,
        [variationPath]: {
          ...this.state.variationPropsList[variationPath],
          props,
        },
      },
    });

    // Persist changes to server every PERSISTENCE_TIMEOUT milliseconds
    this.debouncedPersistVariation(variationPath, props);
  };

  randomiseEverything = (path) => {
    this.persistVariation(path, this.getRandomValues());
  };

  selectVariation = (id) => {
    this.setState({
      selectedVariationId: id,
    });
  };

  startCustomMetadataEditMode = () => {
    document.body.style.overflow = 'hidden';
    this.setState({
      customMetadataEditMode: true,
    });
  };

  stopCustomMetadataEditMode = () => {
    document.body.style.overflow = '';
    this.setState({
      customMetadataEditMode: false,
    });
  };

  startVariationEditMode = (id) => {
    document.body.style.overflow = 'hidden';
    this.setState({
      variationEditMode: true,
      selectedVariationId: id,
    });
  };

  stopVariationEditMode = () => {
    document.body.style.overflow = '';
    this.setState({
      variationEditMode: false,
    });
  };

  render() {
    if (this.state.loadingMetadata && this.state.loadingVariations) {
      return <div>Loading …</div>;
    }

    const { component } = this.props;
    const selectedVariation =
      find(
        this.state.variationPropsList,
        (variationProps, key) => this.state.selectedVariationId === key
      );
    return (
      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          {getComponentNameFromPath(this.props.componentPath)}
        </h2>
        <button
          onClick={this.startCustomMetadataEditMode}
          style={{
            margin: '0 auto',
            display: 'block',
          }}
        >
          Edit Metadata
        </button>
        {/* METADATA EDIT MODE MODAL */}
        <Modal
          visible={this.state.customMetadataEditMode}
          onCloseClick={this.stopCustomMetadataEditMode}
        >
          <CustomMetadataForm
            customMetadata={this.state.customMetadata}
            parsedMetadata={this.props.meta}
            updateCustomMetadata={this.updateCustomMetadata}
          />
        </Modal>
        {/* VARIATION EDIT MODE MODAL */}
        {(this.state.selectedVariationId) && (
          <Modal
            visible={this.state.variationEditMode}
            onCloseClick={this.stopVariationEditMode}
          >
            <div className={styles.modalWrapper}>
              <PropForm
                metadataWithControls={this.state.metadataWithControls}
                onVariationPropsChange={this.updateVariation}
                onRandomClick={this.randomiseEverything.bind(this, this.state.selectedVariationId)} // eslint-disable-line react/jsx-no-bind,max-len
                open={this.state.variationEditMode}
                variationPath={this.state.selectedVariationId}
                variationProps={selectedVariation.props}
              />
              <Playground
                component={component}
                fullHeight
                variationProps={selectedVariation.props}
                variationPath={this.state.selectedVariationId}
              />
            </div>
          </Modal>
        )}
        {/* MAIN AREA WITH PLAYGROUNDS */}
        {map(this.state.variationPropsList, (variation, variationPath) => (
          <Playground
            key={variationPath}
            component={component}
            title={variation.name}
            variationProps={variation.props}
            variationPath={variationPath}
            onDeleteButtonClick={this.deleteVariation}
            onEditButtonClick={this.startVariationEditMode}
          />
        ))}
        <CreateVariationButton
          error={this.state.createVariationError}
          onSubmit={this.createVariation}
        />
      </div>
    );
  }
}

export default PlaygroundList;
