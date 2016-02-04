module.exports = function () {
  this.cacheable();
  return 'module.exports = ' + JSON.stringify('This will contain the meta information for ' + this.resourcePath);
};