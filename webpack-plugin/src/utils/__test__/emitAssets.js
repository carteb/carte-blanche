/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import emitAssets from '../emitAssets';
import sinon from 'sinon';

describe('emitAssets', () => {
  let compilation;

  beforeEach(() => {
    compilation = {
      assets: {},
    };
  });

  it('should add to compilation.assets', () => {
    // Setup
    const assets = {
      'bundle.js': 'some code here',
    };
    const callback = sinon.spy();
    // Do it
    emitAssets(compilation, assets, '', callback);
    expect(compilation.assets['bundle.js']).to.exist;
  });

  it('should add both source and size to a compilation.assets asset', () => {
    // Setup
    const assets = {
      'bundle.js': 'some code here',
    };
    const callback = sinon.spy();
    // Do it
    emitAssets(compilation, assets, '', callback);
    expect(compilation.assets['bundle.js']).to.exist;
    expect(compilation.assets['bundle.js'].source).to.be.a.function;
    expect(compilation.assets['bundle.js'].size).to.be.a.function;
  });

  it('should call take allow to emit assets at a sub folder', () => {
    // Setup
    const assets = {
      'bundle.js': 'some code here',
    };
    const callback = sinon.spy();
    const subfolder = 'js';
    // Do it
    emitAssets(compilation, assets, subfolder, callback);
    expect(compilation.assets[`${subfolder}/bundle.js`]).to.exist;
  });

  it('should call the callback as the third argument', () => {
    // Setup
    const assets = {
      'bundle.js': 'some code here',
    };
    const callback = sinon.spy();
    // Do it
    emitAssets(compilation, assets, callback);
    expect(callback.called).to.be.true;
  });

  it('should call the callback as the fourth argument', () => {
    // Setup
    const assets = {
      'bundle.js': 'some code here',
    };
    const callback = sinon.spy();
    // Do it
    emitAssets(compilation, assets, '', callback);
    expect(callback.called).to.be.true;
  });
});
