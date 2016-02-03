module.exports = function styleguideLoader(source) {
  var id = parseInt(this.query.substr(1), 10);
  this._compiler.styleguideCache[id][this.resource] = source;
  this.cacheable();
  return source;
};