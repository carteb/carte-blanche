const reactDocs = require('react-docgen').utils;

const {
  isReactComponentClass,
  isStatelessComponent,
  normalizeClassDefiniton,
} = reactDocs;

const normalizeClassDefinition = normalizeClassDefiniton;

export default function findAllReactCreateClassCalls(ast, recast) {
  let definition;

  function classVisitor(path) {
    if (isReactComponentClass(path)) {
      normalizeClassDefinition(path);
      definition = path;
    }
    return false;
  }

  function isHighOrderComponent(path) {
    if (isStatelessComponent(path)) {
      definition = path;
    }
    return false;
  }

  recast.visit(ast, {
    visitFunctionDeclaration: isHighOrderComponent,
    visitFunctionExpression: isHighOrderComponent,
    visitArrowFunctionExpression: isHighOrderComponent,
    visitClassExpression: classVisitor,
    visitClassDeclaration: classVisitor,
  });

  return definition;
}
