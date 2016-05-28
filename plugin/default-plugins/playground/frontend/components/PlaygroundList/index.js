/**
 * Playground Store
 */

// External
import React, { Component } from 'react';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import debounce from 'lodash/debounce';
import io from 'socket.io-client';
import getSlug from 'speakingurl';
import 'whatwg-fetch';

// Utilities
import getControl from '../../utils/getControl';
import randomValues from '../../utils/randomValues';
import propsToVariation from '../../utils/propsToVariation';
import variationsToProps from '../../utils/variationsToProps';
import codeToCustomMetadata from '../../utils/codeToCustomMetadata';
import customMetadataToCode from '../../utils/customMetadataToCode';
import addDataToVariation from '../../utils/addDataToVariation';
import KeyCodes from '../../utils/keycodes';
import getComponentNameFromPath from '../../../../../../utils/getComponentNameFromPath';
import getStylingNodes from '../../../../../../utils/getStylingNodes';

// Components
import Playground from '../Playground';
import PropForm from '../PropForm';
import Modal from '../Modal';
import CreateVariationButton from '../common/CreateVariationButton';
import EditButton from '../common/EditButton';
import CustomMetadataForm from '../CustomMetadataForm';

// Styles
import styles from './styles.css';

// Global settings
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
    // Create a debounced method from the persistVariation method
    this.debouncedPersistVariation = debounce(
      (variationPath, props) => { this.persistVariation(variationPath, props); },
      PERSISTENCE_DELAY
    );
    // Create a debounced method from the persistCustomMetadata method
    this.debouncedPersistCustomMetadata = debounce(
      (customMetadata) => { this.persistCustomMetadata(customMetadata); },
      PERSISTENCE_DELAY
    );

    // Fetch the metadata and the variations of first render
    this.fetchMetadata();
    this.fetchVariations();
    // Connect to the socket server
    this.connectToSocket();
  }

  componentWillUnmount() {
    // Disconnet from the socker server before we unmount
    this.disconnectFromSocket();
  }

  // Get random values
  getRandomValues = () => randomValues(this.state.metadataWithControls);

  // Generete the variation string from the props object
  getVariationStringFromProps = (data) => {
    const {
      props,
      name,
    } = data;
    // Generate a human-readable JSON string from the props
    const propsString = propsToVariation(props);
    // Add the name to the data we save
    return addDataToVariation(propsString, { name });
  };

  // Fetch the metadata of the current component
  fetchMetadata = () => {
    // TODO dynamic host
    fetch(`http://${this.props.hostname}:${this.props.port}/components/${this.props.componentPath}`)
      .then((response) => response.json())
      .then((json) => {
        const customMetadata = codeToCustomMetadata(json.data);
        const metadataWithControls = this.generateMetadataWithControls(
          this.props.meta,
          customMetadata
        );

        this.setState({
          metadataWithControls,
          customMetadata,
          loadingMetadata: false,
        });
      })
      .catch((ex) => {
        // TODO proper error handling
        console.error('meta data parsing failed', ex); // eslint-disable-line no-console
      });
  };

  // Attach the correct controls to the component metadata
  generateMetadataWithControls = (docgenMetadata, customMetadata) => {
    let metadataWithControls;
    if (docgenMetadata.props) {
      metadataWithControls = mapValues(docgenMetadata.props, (prop, propKey) => {
        const newProp = { ...prop };
        // Get the metadata for this property
        const propMeta = customMetadata && customMetadata.props && customMetadata.props[propKey];
        // Attach the control
        newProp.control = getControl(newProp, propMeta);
        newProp.controlType = propMeta && propMeta.controlType;
        return newProp;
      });
    }

    return metadataWithControls;
  };

  // Connect to the socket server
  connectToSocket = () => {
    // TODO dynamic host
    this.socket = io.connect(`http://${this.props.hostname}:${this.props.port}`);
    // Listen to the events dispatched by the socket server
    this.socket.on('componentMetadataChanged', this.fetchMetadata);
    this.socket.on('componentVariationChanged', this.fetchVariations);
    this.socket.on('componentVariationAdded', this.fetchVariations);
    this.socket.on('componentVariationRemoved', this.fetchVariations);
  };

  // Disconnect from the socker server
  disconnectFromSocket = () => {
    if (this.socket) {
      this.socket.disconnect();
    }
  };

  // Fetch all variations for the current component
  fetchVariations = () => {
    // TODO dynamic host
    fetch(`http://${this.props.hostname}:${this.props.port}/variations/${this.props.componentPath}`)
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
      })
      .catch((ex) => {
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
    const data = this.getVariationStringFromProps({
      props: this.getRandomValues(),
      name,
    });
    // TODO dynamic host
    fetch(`http://${this.props.hostname}:${this.props.port}/variations/${this.props.componentPath}`, {
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
    fetch(`http://${this.props.hostname}:${this.props.port}/variations/${this.props.componentPath}?variation=${variationPath}`, {
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
    const data = this.getVariationStringFromProps({
      props,
      name: this.state.variationPropsList[variationPath].name,
    });
    fetch(`http://${this.props.hostname}:${this.props.port}/variations/${this.props.componentPath}`, {
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
    const metadataWithControls = this.generateMetadataWithControls(this.props.meta, customMetadata);
    this.setState({
      metadataWithControls,
      customMetadata,
      loadingMetadata: false,
    });
    // Persist changes to metadata to server
    this.debouncedPersistCustomMetadata(customMetadata);
  };

  persistCustomMetadata = (customMetadata) => {
    fetch(`http://${this.props.hostname}:${this.props.port}/components/${this.props.componentPath}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: customMetadataToCode(customMetadata),
      }),
    })
    .catch((err) => {
      // TODO PROPER ERROR HANDLING
      console.trace(err); // eslint-disable-line no-console
    });
  };

  updateVariation = (variationPath, props) => {
    // Update changes locally immediately for snappy UI
    this.setState({
      variationPropsList: {
        ...this.state.variationPropsList,
        [variationPath]: {
          ...this.state.variationPropsList[variationPath],
          props,
        },
      },
    });

    // Persist changes to server
    this.debouncedPersistVariation(variationPath, props);
  };

  // Keyboard Controls
  handleKeyPress = (evt) => {
    if (evt.keyCode === KeyCodes.ESC) {
      // If the ESC key was pressed, close the modal
      if (this.state.customMetadataEditMode) {
        this.stopCustomMetadataEditMode();
      } else if (this.state.variationEditMode) {
        this.stopVariationEditMode();
      }
    }
  }

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
    // Find the selected variation
    const selectedVariation = this.state.variationPropsList[this.state.selectedVariationId];

    // Get all the styling of the components. These tags are injected by style-loader
    // and we can grab all of them and inject them into each iframe of the variations
    const userStylingNodes = getStylingNodes();

    return (
      <div className={styles.wrapper} onKeyDown={this.handleKeyPress}>
        <h2 className={styles.title}>
          {getComponentNameFromPath(this.props.componentPath)}
          <EditButton
            onClick={this.startCustomMetadataEditMode}
            className={styles.componentEditButton}
          />
        </h2>

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
        <Modal
          visible={this.state.variationEditMode}
          onCloseClick={this.stopVariationEditMode}
        >
          {(this.state.selectedVariationId) && (
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
                stylingNodes={userStylingNodes}
              />
            </div>
          )}
        </Modal>
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
            stylingNodes={userStylingNodes}
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
