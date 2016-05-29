/* eslint-disable max-len */
import loaderUtils from 'loader-utils';
import path from 'path';

// Match all file extensions
const FILE_EXTENSION_REGEX = /\..+/;

/**
 * Generates an entry file for each component
 *
 * @param  {String} entryTemplate The entry file template, i.e. entryTemplate.js
 *
 * @return {String}               A string of the filled out entry file template with the component data
 */
module.exports = function entryLoader(entryTemplate) {
  this.cacheable();
  // this.query is the full, raw loader query e.g. "?request=/Users/asdf/…/node_modules/babel-loader/index.js%21/Users/asdf/…/src/components/Button.js"
  // parseQuery strips out the "?request=" from the query, returning an object { request: "…" }
  const query = loaderUtils.parseQuery(this.query);
  // Parse the request, getting only the actual component path, i.e.
  // /User/asdf/…/src/components/Button.js
  const requestPath = query.request.replace(/^.+!/, '').replace(/\?.+$/, '');
  // Make that component path relative to the compiler context, i.e.
  // src/components/Button.js
  const relativePath = path.relative(this._compiler.options.context, requestPath); // eslint-disable-line
  // Strip the file extension
  const name = relativePath.replace(FILE_EXTENSION_REGEX, '');
  // Replace the variables in the entry file template with the right values
  return entryTemplate
          .replace(/%%request%%/g, query.request)
          .replace(/%%name%%/g, name)
          .replace(/%%path%%/g, relativePath)
          .replace(/%%pluginsLoader%%/g, require.resolve('./plugins-loader.js'))
          .replace(/%%requestPath%%/g, requestPath);
};
