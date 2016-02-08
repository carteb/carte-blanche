import React from 'react';

// import { transform } from 'babel-standalone';
import ReactDOM from 'react-dom';

const compileExample = (example, component) => { // eslint-disable-line no-unused-vars
  // TODO we have to do better here. This could easily fall appart.
  const componentName = example
    .match(/<(.+?)(>|\s)/)[0]
    .replace('<', '')
    .replace('>', '');

  const baseCode = `
    (function (React, ${componentName}) {
      ${example}
    });`;
  return baseCode;

  // const code = transform(baseCode, {
  //   presets: ['es2015', 'stage-0', 'react'],
  // }).code;
  // return eval(code)(React, component)(); // eslint-disable-line no-eval
};

class Examples extends React.Component {

  componentDidMount() {
    this.compile();
  }

  compile() {
    const mountNode = this.refs.mount;
    ReactDOM.unmountComponentAtNode(mountNode);
    const compiledExamples = this.props.examples.map((example) => {
      return compileExample(example, this.props.component);
    });
    ReactDOM.render((
      <div>
        {compiledExamples.map((reactElement, index) => ((
          <div key={index}>{ reactElement }</div>
        )))}
      </div>
    ), mountNode);
  }

  render() {
    return (
      <div>
        <h2>Examples</h2>
        <div ref="mount" />
      </div>
    );
  }
}

export default Examples;
