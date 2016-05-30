module.exports = function exampleLoader() {
  this.cacheable();
  return 'module.exports = "examples";';
};
