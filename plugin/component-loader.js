import loaderUtils from "loader-utils";

module.exports = function styleguideLoader(source) {
  this.cacheable();
  var query = loaderUtils.parseQuery(this.query);
  return source.replace(/%%request%%/g, query.request);
};