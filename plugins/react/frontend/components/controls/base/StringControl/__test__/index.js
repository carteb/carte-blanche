import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import StringControl from '../index';

const label = 'string-control';
const secondaryLabel = 'secondary';
const onUpdate = sinon.spy();
const value = 'test some string';
let props;
let wrapper;

describe('<StringControl />', () => {
  beforeEach(() => {
    props = { label, onUpdate, value, isNested: false, secondaryLabel };
    wrapper = mount(<StringControl {...props} />);
  });

  it('should render label prop', () => {
    expect(wrapper.text()).to.contain(label);
  });

  it('should render secondary label prop', () => {
    expect(wrapper.text()).to.contain(secondaryLabel);
  });

  it('should render initial value', () => {
    expect(wrapper.find('#string-control').props().value).to.equal(value);
  });

  it('should call onUpdate() when changing value', () => {
    const input = wrapper.find('#string-control');
    input.simulate('change', { target: { value: 2 } });
    sinon.assert.calledWith(onUpdate, { value: 2 });
    onUpdate.reset();
  });

  it('should call onUpdate() when clicking on random', () => {
    const clickBtn = wrapper.find('svg').first();
    clickBtn.simulate('click');
    sinon.assert.calledOnce(onUpdate);
    onUpdate.reset();
  });
});
