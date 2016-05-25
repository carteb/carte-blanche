const reactDocs = require('react-docgen').utils;

const {
  isReactComponentClass,
  isStatelessComponent,
  normalizeClassDefiniton,
} = reactDocs;

const normalizeClassDefinition = normalizeClassDefiniton;

export default function findReactComponent(ast, recast) {
  let definition;

  function findComponent(path) {
    if (isReactComponentClass(path)) {
      normalizeClassDefinition(path);
      definition = path;
    }

    if (isStatelessComponent(path)) {
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
}
