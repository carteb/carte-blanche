import React from 'react';

import { transform } from 'babel-standalone';
import ReactDOM from 'react-dom';

class Examples extends React.Component {

  componentDidMount() {
    this.compile();
  }

  compile() {
    const mountNode = this.refs.mount;
    ReactDOM.unmountComponentAtNode(mountNode);
    const compiledExamples =
      this.props.examples.map((example) => (
        example(this.props.component)
      ));
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
