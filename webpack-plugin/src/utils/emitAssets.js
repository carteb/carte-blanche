/**
 * Emit some assets to a compilation
 *
 * @param  {Object}   compilation The compilation we want to emit the assets from
 * @param  {Object}   assets      The assets we want to emit, keyed by filename
 * @param  {String}   [subFolder] Optionally, emit the assets to a subfolder
 * @param  {Function} callback
 */

import path from 'path';
import isString from 'lodash/isString';

function emitAssets(compilation, assets, subFolder, callback) {
  const cb = callback || subFolder;
  const rootPath = isString(subFolder) && subFolder || '';
  // Emit carte-blanche assets
  Object.keys(assets).forEach((filename) => {
    // eslint-disable-next-line no-param-reassign
    compilation.assets[path.posix.join(rootPath, filename)] = {
      source: () => assets[filename],
      size: () => assets[filename].length,
    };
  });
  cb();
}

export default emitAssets;
