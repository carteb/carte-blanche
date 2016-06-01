/* eslint-disable */

var path = require('path');
var carteBlancheUtilsBeta = require('carte-blanche-utils'); // eslint-disable-line

/**
 * Get the absolute variation path from the variation base path and a component path
 *
 * @param  {String} variationsBasePath    The base variation path, e.g. /User/asdf/…/variations
 * @param  {String} relativeComponentPath The relative component path, e.g. src/components/Button.js
 *
 * @return {String}                       The absolute variation path, e.g. /User/asdf/…/variations/src/components/Button
 */
var getAbsoluteVariationPath = (variationsBasePath, relativeComponentPath) => {
  return path.join(
    variationsBasePath,
    carteBlancheUtilsBeta.getVariationPathFromComponentPath(relativeComponentPath)
  );
};

module.exports = getAbsoluteVariationPath;
