import React from 'react';

const Examples = () => {
  const compiledExamples = this.props.examples.map((example) => (
    example(this.props.component)
  ));
  return (
    <div>
      <h2>Examples</h2>
      <div>
        {compiledExamples.map((reactElement, index) => ((
          <div key={index}>{reactElement}</div>
        )))}
      </div>
    </div>
  );
};

export default Examples;
