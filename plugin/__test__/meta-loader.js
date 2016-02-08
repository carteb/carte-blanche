import { expect } from 'chai';
import MetaLoader from '../meta-loader';

describe('MetaLoader', () => {
  let compiler;

  beforeEach(() => {
    compiler = {
      cacheable: () => null, // TODO add sinon spy once I got internet again
      MetaLoader,
    };
  });

  it('should extract the description & PropTypes information', () => {
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
    const expected = 'module.exports = {"description":"","props":{"className":{"type":{"name":"string"},"required":false,"description":""}}}';
    expect(compiler.MetaLoader(source)).to.deep.equal(expected);
  });

  it('should extract the description in case no flow/propTypes are defined', () => {
    const source = `
      import React, { PropTypes } from 'react';

      /**
       * Button component
       */
      export default({ className = 'btn' }) => ((
        <button className={className}>
          Follow
        </button>
      ));
    `;
    const expected = 'module.exports = {"description":"Button component"}';
    expect(compiler.MetaLoader(source)).to.deep.equal(expected);
  });
});
