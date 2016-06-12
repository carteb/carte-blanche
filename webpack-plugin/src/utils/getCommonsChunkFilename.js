import constructorIndexInArray from './constructorIndexInArray';

/**
 * Get the common chunk filename from the CommonsChunkPlugin options
 *
 * @param  {Object} commonsChunkOptions
 *
 * @return {String}                     The common chunk filename
 */
const getCommonsChunkFilename = (pluginOptions) => {
  // Detect CommonsChunkPlugin usage
  const commonsChunkPluginIndex = constructorIndexInArray(
    pluginOptions,
    'CommonsChunkPlugin'
  );

  // Get the filename of the common chunk
  let commonsChunkFilename;
  if (commonsChunkPluginIndex !== false) {
    const commonsChunkOptions = pluginOptions[commonsChunkPluginIndex];
    // Called like "new CommonsChunkPlugin('somename')"
    if (commonsChunkOptions.filenameTemplate ===
        commonsChunkOptions.chunkNames) {
      commonsChunkFilename = `${commonsChunkOptions.chunkNames}.js`;
    // Called like "new CommonsChunkPlugin({ filename: 'somefilename.js' })"
    } else if (commonsChunkOptions.filenameTemplate) {
      commonsChunkFilename = commonsChunkOptions.filenameTemplate;
    // Called like "new CommonsChunkPlugin({ name: 'somename' })"
    } else if (commonsChunkOptions.chunkNames) {
      commonsChunkFilename = `${commonsChunkOptions.chunkNames}.js`;
    // Don't know if this can actually happen, better to have it there just in case
    } else {
      // eslint-disable-next-line no-console
      console.log('[CarteBlanche] We detected you use the CommonsChunkPlugin, ' +
      'but we could not detect the filename of the common chunk. Please use the ' +
      '"filename" option of the CommonsChunkPlugin.');
    }
  }
  return commonsChunkFilename;
};

export default getCommonsChunkFilename;
