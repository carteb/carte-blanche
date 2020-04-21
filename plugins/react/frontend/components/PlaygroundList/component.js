import React from 'react';

import map from 'lodash/map';

import {
    getComponentNameFromPath,
    getVariationPathFromComponentPath,
} from 'carte-blanche-utils';

import Playground from '../common/Playground';
import PropForm from '../PropForm';
import Modal from '../common/Modal';
import CreateVariationButton from '../common/CreateVariationButton';
import EditButton from '../common/EditButton';
import CustomMetadataForm from '../CustomMetadataForm';
import DeleteConfirmationButtons from '../common/DeleteConfirmationButtons';

import styles from './styles.css';

const PlaygroundList = props => (
  <div className={styles.wrapper}>
    <h2 className={styles.title}>
      {getComponentNameFromPath(props.componentPath)}
      <EditButton
        onClick={props.startCustomMetadataEditMode}
        className={styles.componentEditButton}
      />
    </h2>

    {/* METADATA EDIT MODE MODAL */}
    <Modal
      visible={props.customMetadataEditMode}
      onCloseClick={props.stopCustomMetadataEditMode}
    >

      <CustomMetadataForm
        customMetadata={props.customMetadata}
        parsedMetadata={props.meta}
        updateCustomMetadata={props.updateCustomMetadata}
      />
    </Modal>

    {/* VARIATION EDIT MODE MODAL */}
    <Modal
      visible={props.variationEditMode}
      onCloseClick={props.stopVariationEditMode}
    >
      {(props.selectedVariationId) && (
        <div className={styles.modalWrapper}>
          <PropForm
            metadataWithControls={props.metadataWithControls}
            onVariationPropsChange={props.updateVariation}
            onRandomClick={() => props.randomiseEverything(props.selectedVariationId)}
            open={props.variationEditMode}
            variationPath={props.selectedVariationId}
            saving={props.saving}
            variationProps={props.selectedVariation.props}
          />
          <Playground
            userFiles={props.userFiles}
            basePath={props.basePath}
            commonsChunkFilename={props.commonsChunkFilename}
            injectTags={props.injectTags}
            component={props.component}
            componentPath={props.componentPath}
            showSourceCode
            fullHeight
            variationProps={props.selectedVariation.props}
            variationPath={props.selectedVariationId}
          />
        </div>
      )}
    </Modal>

    {/* VARIATION DELETE MODE MODAL */}
    <Modal
      visible={props.variationDeleteMode}
      onCloseClick={props.stopVariationDeleteMode}
    >
      {(props.selectedVariationId) && (
        <div className={styles.deleteModalWrapper}>

          <p>Are you sure you want to delete this variation?</p>

          <DeleteConfirmationButtons
            variationPath={props.selectedVariationId}
            confirmDeleteVariation={props.deleteVariation}
            cancelDeleteVariation={props.stopVariationDeleteMode}
          />

        </div>
      )}
    </Modal>

    {/* MAIN AREA WITH PLAYGROUNDS */}
    {map(props.variationPropsList, (variation, variationPath) => (
      variation.err ? (
        <Playground
          userFiles={props.userFiles}
          basePath={props.basePath}
          commonsChunkFilename={props.commonsChunkFilename}
          injectTags={props.injectTags}
          key={variationPath}
          variationPath={variationPath}
          componentPath={getVariationPathFromComponentPath(props.componentPath)}
          variationBasePath={props.variationBasePath}
          err={variation.err}
        />
      ) : (
        <Playground
          userFiles={props.userFiles}
          basePath={props.basePath}
          commonsChunkFilename={props.commonsChunkFilename}
          injectTags={props.injectTags}
          key={variationPath}
          component={props.component}
          componentPath={props.componentPath}
          title={variation.name}
          variationProps={variation.props}
          variationPath={variationPath}
          onDeleteButtonClick={props.startVariationDeleteMode}
          onEditButtonClick={props.startVariationEditMode}
        />
      )
    ))}
    <CreateVariationButton
      onSubmit={props.createVariation}
      variationPropsList={props.variationPropsList}
    />
  </div>
);

const { shape, object, array, string, bool, func } = React.PropTypes;

PlaygroundList.propTypes = {
  basePath: string.isRequired,
  commonsChunkFilename: string,
  component: func,
  componentPath: string,
  createVariation: func,
  customMetadata: object,
  customMetadataEditMode: bool.isRequired,
  deleteVariation: func,
  dest: string,
  injectTags: array,
  meta: object,
  metadataWithControls: object,
  randomiseEverything: func,
  saving: bool,
  selectedVariation: shape({
    props: object,
  }),
  selectedVariationId: string,
  startCustomMetadataEditMode: func.isRequired,
  startVariationDeleteMode: func,
  startVariationEditMode: func,
  stopCustomMetadataEditMode: func.isRequired,
  stopVariationDeleteMode: func.isRequired,
  stopVariationEditMode: func.isRequired,
  updateCustomMetadata: func,
  updateVariation: func,
  userFiles: array,
  variationBasePath: string,
  variationDeleteMode: bool.isRequired,
  variationPropsList: object,
};

export default PlaygroundList;
