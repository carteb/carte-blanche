import loaderUtils from 'loader-utils';
import path from 'path';

module.exports = function styleguideLoader(source) {
  this.cacheable();

  // TODO Explain what this dows and why every component needs to go through it
  const query = loaderUtils.parseQuery(this.query);
  const requestPath = query.request.replace(/^.+!/, '').replace(/\?.+$/, '');
  const relativePath = path.relative(this._compiler.options.context, requestPath);
  const name = relativePath.replace(/\..+/, '');
  return source
          .replace(/%%request%%/g, query.request)
          .replace(/%%name%%/g, name)
          .replace(/%%path%%/g, relativePath)
          .replace(/%%metaLoader%%/g, require.resolve('./meta-loader.js'))
          .replace(/%%sourceLoader%%/g, require.resolve('./source-loader.js'))
          .replace(/%%examplesLoader%%/g, 'babel!' + require.resolve('./examples-loader.js'))
          .replace(/%%requestPath%%/g, requestPath);
};
