/* eslint-disable no-var */

var reactDocs = require('react-docgen').utils;

module.exports = function findReactComponent(ast, recast) {
  var definition;

  function findComponent(path) {
    if (reactDocs.isReactComponentClass(path)) {
      reactDocs.normalizeClassDefinition(path);
      definition = path;
    }

    if (reactDocs.isStatelessComponent(path)) {
      definition = path;
    }

    return false;
  }

  recast.visit(ast, {
    visitFunctionDeclaration: findComponent,
    visitFunctionExpression: findComponent,
    visitArrowFunctionExpression: findComponent,
    visitClassExpression: findComponent,
    visitClassDeclaration: findComponent,
  });

  return definition;
};
