import { expect } from 'chai';
import MetaLoader from '../meta-loader';

describe('plugin', () => {
  const source = `
    import React, { PropTypes } from 'react';

    const Button = ({ className = 'btn' }) => ((
      <button className={className}>
        Follow
      </button>
    ));

    Button.propTypes = {
      /* HTML native button types */
      className: PropTypes.string,
    };

    export default Button;
  `;

  it('should extract the PropTypes information', () => {
    const compiler = {
      cacheable: () => null, // TODO add sinon spy once I got internet again
      MetaLoader,
    };
    const expected = 'module.exports = {"description":"","props":{"className":{"type":{"name":"string"},"required":false,"description":""}}}';
    expect(compiler.MetaLoader(source)).to.deep.equal(expected);
  });
});
