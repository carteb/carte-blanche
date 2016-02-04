import loaderUtils from 'loader-utils';

module.exports = function styleguideLoader(source) {
  this.cacheable();
  // TODO Explain what this dows and why every component needs to go through it
  const query = loaderUtils.parseQuery(this.query);
  return source.replace(/%%request%%/g, query.request);
};
