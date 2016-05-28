import loaderUtils from 'loader-utils';
import path from 'path';

module.exports = function styleguideLoader(source) {
  this.cacheable();
  const query = loaderUtils.parseQuery(this.query);
  const requestPath = query.request.replace(/^.+!/, '').replace(/\?.+$/, '');
  const relativePath = path.relative(this._compiler.options.context, requestPath); // eslint-disable-line
  const name = relativePath.replace(/\..+/, '');
  return source
          .replace(/%%request%%/g, query.request)
          .replace(/%%name%%/g, name)
          .replace(/%%path%%/g, relativePath)
          .replace(/%%metaLoader%%/g, require.resolve('./meta-loader.js'))
          .replace(/%%requestPath%%/g, requestPath);
};
