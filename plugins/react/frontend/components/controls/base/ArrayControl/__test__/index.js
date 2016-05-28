import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import ArrayControl from '../index';

const label = 'some label text';
const onUpdate = sinon.spy();
const value = [1, 10, 100, 1000, 10000];
const propTypeData = {
  description: '',
  name: 'arrayOf',
  required: false,
  control: ArrayControl,
  value: {
    name: 'number',
  },
};
const isNested = false;
let props;
let wrapper;

describe('<ArrayControl />', () => {
  beforeEach(() => {
    props = { label, onUpdate, value, propTypeData, isNested };
    wrapper = mount(<ArrayControl {...props} />);
  });

  it('should render label prop', () => {
    expect(wrapper.text()).to.contain(label);
  });

  it('should call onUpdate()', () => {
    const clickBtn = wrapper.find('svg').first();
    clickBtn.simulate('click');
    sinon.assert.calledWith(onUpdate, sinon.match.hasOwn('value'));
  });

  it('should render all values', () => {
    expect(wrapper.find('input[type=\'number\']').length).to.equal(5);
  });
});
