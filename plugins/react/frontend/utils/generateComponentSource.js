const wrapPropValue = (value) => {
  if (typeof value === 'string') {
    return `"${value}"`;
  }

  return `{${JSON.stringify(value)}}`;
};

const generatePropsCode = (props) => (
  Object.keys(props).reduce((code, key) => {
    if (key === 'children' || typeof props[key] === 'function') {
      return code;
    }

    return `${code} ${key}=${wrapPropValue(props[key])}`;
  }, '')
);

const generateSource = (name, props) => {
  const propsCode = generatePropsCode(props || {});

  if (props && props.children) {
    // Are complicated children supported?
    return `<${name}${propsCode}>${props.children}</${name}>`;
  }

  return `<${name}${propsCode} />`;
};

module.exports = generateSource;
