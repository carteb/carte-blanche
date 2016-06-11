/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import constructorIndexInArray from '../constructorIndexInArray';

describe('constructorIndexInArray', () => {
  it('should find normal function declarations', () => {
    function CommonsChunkPlugin() {}
    const array = [
      new CommonsChunkPlugin(),
    ];
    expect(constructorIndexInArray(array, 'CommonsChunkPlugin')).to.equal(0);
  });

  it('should find it, not depending on the options passed', () => {
    function CommonsChunkPlugin() {}
    const array = [
      new CommonsChunkPlugin({
        some: 'options',
      }),
    ];
    expect(constructorIndexInArray(array, 'CommonsChunkPlugin')).to.equal(0);
  });

  it('should find it at other places than the first', () => {
    function SomeOtherPlugin() {}
    function CommonsChunkPlugin() {}
    const array = [
      new SomeOtherPlugin(),
      new CommonsChunkPlugin(),
    ];
    expect(constructorIndexInArray(array, 'CommonsChunkPlugin')).to.equal(1);
  });

  it('should find ES6 arrow functions', () => {
    const CommonsChunkPlugin = () => {};
    const array = [
      new CommonsChunkPlugin(),
    ];
    expect(constructorIndexInArray(array, 'CommonsChunkPlugin')).to.equal(0);
  });

  it('should throw if the first argument is not an array', () => {
    expect(constructorIndexInArray).to.throw(/The first argument must be an array/);
  });

  it('should not find non-instantiated classes', () => {
    const CommonsChunkPlugin = () => {};
    const array = [
      CommonsChunkPlugin(),
    ];
    expect(constructorIndexInArray(array, 'CommonsChunkPlugin')).to.be.false;
  });
});
