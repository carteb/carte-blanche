/**
 * Playground Store
 */

// External
import React, { Component, PropTypes } from 'react';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import debounce from 'lodash/debounce';
import has from 'lodash/has';
import io from 'socket.io-client';
import axios from 'axios';
import { connect } from 'react-redux';

// Utilities
import getControl from '../../utils/getControl';
import randomValues from '../../utils/randomValues';
import propsToVariation from '../../utils/propsToVariation';
import variationsToProps from '../../utils/variationsToProps';
import codeToCustomMetadata from '../../utils/codeToCustomMetadata';
import customMetadataToCode from '../../utils/customMetadataToCode';
import addDataToVariation from '../../utils/addDataToVariation';
// Shared Utilities between ReactPlugin and Client
import {
  keycodes as KeyCodes,
  getVariationPathFromComponentPath,
} from 'carte-blanche-utils';

// Components
import PlaygroundListComponent from './component';

// Styles
import styles from './styles.css';

// Global settings
const PERSISTENCE_DELAY = 1000;

const { func, string, object } = PropTypes;

class PlaygroundList extends Component {
  static propTypes = {
    component: func.isRequired,
    componentPath: string.isRequired,
    navigationStore: object.isRequired,
  };

  constructor() {
    super();

    this.state = {
      metadataError: null,
      variationPropsList: {},
      variationEditMode: false,
      variationDeleteMode: false,
      customMetadataEditMode: false,
      selectedVariationId: undefined,
      customMetadata: undefined,
      metadataWithControls: null,
      loadingMetadata: true,
      loadingVariations: true,
      saving: false,
    };
  }

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

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress, true);
  }

  componentWillUnmount() {
    // Disconnet from the socker server before we unmount
    this.disconnectFromSocket();
    window.removeEventListener('keydown', this.handleKeyPress);
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

  handleKeyPress = (evt) => {
    // Use either which or keyCode, depending on browser support
    const keyCode = evt.which || evt.keyCode;
    if (keyCode === KeyCodes.ESC) {
      // If the ESC key was pressed, close the modal
      if (this.state.customMetadataEditMode) {
        evt.stopPropagation();
        this.stopCustomMetadataEditMode();
      } else if (this.state.variationEditMode) {
        evt.stopPropagation();
        this.stopVariationEditMode();
      }
    }
  };

  // Fetch the metadata of the current component
  fetchMetadata = () => {
    const {
      componentPath,
      meta,
      options: {
        hostname,
        port,
      },
    } = this.props;
    axios(`http://${hostname}:${port}/components/${componentPath}`)
      .then((response) => {
        const json = response.data;
        const customMetadata = codeToCustomMetadata(json.data);
        if (customMetadata.err) {
          this.setState({
            metadataError: customMetadata.err,
          });
        } else {
          const metadataWithControls = this.generateMetadataWithControls(
            meta,
            customMetadata
          );
          this.setState({
            metadataWithControls,
            customMetadata,
            metadataError: null,
            loadingMetadata: false,
          });
        }
      })
      .catch((ex) => {
        console.error('Generating metadata failed', ex); // eslint-disable-line no-console
      });
  };

  // Attach the correct controls to the component metadata
  // TODO rename to generateMetadataWithControlsAndConstraints
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
        if (has(customMetadata, ['props', propKey])) {
          newProp.customMetaData = customMetadata.props[propKey];
        } else {
          newProp.customMetaData = {};
        }
        return newProp;
      });
    }

    return metadataWithControls;
  };

  // Connect to the socket server
  connectToSocket = () => {
    const { hostname, port } = this.props.options;
    this.socket = io.connect(`http://${hostname}:${port}`);
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
    const {
      componentPath,
      navigationStore,
      options: {
        hostname,
        port,
      },
    } = this.props;
    axios(`http://${hostname}:${port}/variations/${componentPath}`)
      .then((response) => {
        const json = response.data;
        const variationPropsList = variationsToProps(json.data);

        this.setState({
          variationPropsList,
          loadingVariations: false,
        });

        const links = map(variationPropsList, (variation, key) => (
          {
            name: variation.name,
            link: key,
          }
        ));
        navigationStore.setPluginLinks(componentPath, 'react', links);
      })
      .catch((ex) => {
        // TODO proper error handling
        console.error(ex.stack); // eslint-disable-line no-console
      });
  };

  createVariation = (name, slug) => {
    const {
      componentPath,
      options: {
        hostname,
        port,
      },
    } = this.props;
    const data = this.getVariationStringFromProps({
      props: this.getRandomValues(),
      name,
    });
    axios(`http://${hostname}:${port}/variations/${componentPath}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        variation: `${slug}`,
        code: data,
      }),
    })
      .then(() => {
        // TODO only fetch in case there was a 200 response (should we switch to 201?)
        this.fetchVariations();
      }).catch((err) => {
        // TODO proper error handling
        console.error(err.stack); // eslint-disable-line no-console
      });
  };

  deleteVariation = (variationPath) => {
    const {
      componentPath,
      options: {
        hostname,
        port,
      },
    } = this.props;
    this.stopVariationDeleteMode();
    axios(`http://${hostname}:${port}/variations/${componentPath}?variation=${variationPath}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      this.setState({
        variationEditMode: false,
        variationDeleteMode: false,
        selectedVariationId: undefined,
      });
      this.fetchVariations();
    })
    .catch((err) => {
      // TODO PROPER ERROR HANDLING
      console.error(err.stack); // eslint-disable-line no-console
    });
  };

  persistVariation = (variationPath, props) => {
    const {
      componentPath,
      options: {
        hostname,
        port,
      },
    } = this.props;
    const data = this.getVariationStringFromProps({
      props,
      name: this.state.variationPropsList[variationPath].name,
    });
    axios(`http://${hostname}:${port}/variations/${componentPath}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        variation: variationPath,
        code: data,
      }),
    })
    .then(() => {
      this.setState({
        saving: false,
      });
      this.fetchVariations();
    })
    .catch((err) => {
      // TODO PROPER ERROR HANDLING
      console.error(err.stack); // eslint-disable-line no-console
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
    const {
      componentPath,
      options: {
        hostname,
        port,
      },
    } = this.props;
    axios(`http://${hostname}:${port}/components/${componentPath}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        code: customMetadataToCode(customMetadata),
      }),
    })
    .catch((err) => {
      // TODO PROPER ERROR HANDLING
      console.error(err.stack); // eslint-disable-line no-console
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
      saving: true,
    });

    // Persist changes to server
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

  startVariationDeleteMode = (id) => {
    document.body.style.overflow = 'hidden';
    this.setState({
      variationDeleteMode: true,
      selectedVariationId: id,
    });
  };

  stopVariationDeleteMode = () => {
    document.body.style.overflow = '';
    this.setState({
      variationDeleteMode: false,
    });
  };

  render() {
    if (this.state.loadingMetadata && this.state.loadingVariations) {
      return <div className={styles.emptyWrapper} />;
    }

    if (this.state.metadataError) {
      return (
        <div className={styles.errWrapper}>
          <code className={styles.err}>
            {/* eslint-disable max-len */}
            {`${this.state.metadataError}
    in ${this.props.variationBasePath}/${getVariationPathFromComponentPath(this.props.componentPath)}/meta.js`}
            {/* eslint-enable max-len */}
          </code>
        </div>
      );
    }

    const {
      commonsChunkFilename,
      component,
      componentPath,
      dest,
      meta,
      options,
      userFiles,
    } = this.props;
    const {
      customMetadata,
      customMetadataEditMode,
      metadataWithControls,
      saving,
      selectedVariationId,
      variationDeleteMode,
      variationEditMode,
      variationPropsList,
    } = this.state;

    // Find the selected variation
    const selectedVariation = variationPropsList[selectedVariationId];
    return (<PlaygroundListComponent
      commonsChunkFilename={commonsChunkFilename}
      component={component}
      componentPath={componentPath}
      createVariation={this.createVariation}
      customMetadata={customMetadata}
      customMetadataEditMode={customMetadataEditMode}
      deleteVariation={this.deleteVariation}
      dest={dest}
      injectTags={options.injectTags}
      meta={meta}
      metadataWithControls={metadataWithControls}
      randomiseEverything={this.randomiseEverything}
      saving={saving}
      selectedVariation={selectedVariation}
      selectedVariationId={selectedVariationId}
      startCustomMetadataEditMode={this.startCustomMetadataEditMode}
      startVariationDeleteMode={this.startVariationDeleteMode}
      startVariationEditMode={this.startVariationEditMode}
      stopCustomMetadataEditMode={this.stopCustomMetadataEditMode}
      stopVariationDeleteMode={this.stopVariationDeleteMode}
      stopVariationEditMode={this.stopVariationEditMode}
      updateCustomMetadata={this.updateCustomMetadata}
      updateVariation={this.updateVariation}
      userFiles={userFiles}
      variationBasePath={options.variationBasePath}
      variationDeleteMode={variationDeleteMode}
      variationEditMode={variationEditMode}
      variationPropsList={variationPropsList}
    />);
  }
}

const mapStateToProps = state => ({
  commonsChunkFilename: state.pluginData.commonsChunkFilename,
  dest: state.pluginData.dest,
  meta: state.pluginData.meta,
  options: state.options,
  userFiles: state.files,
});

export default connect(mapStateToProps)(PlaygroundList);
