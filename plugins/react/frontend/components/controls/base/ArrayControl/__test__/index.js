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
const nestedLevel = 0;
let props;
let wrapper;

describe('<ArrayControl />', () => {
  beforeEach(() => {
    props = { label, onUpdate, value, propTypeData, nestedLevel };
    wrapper = mount(<ArrayControl {...props} />);
  });

  it('should render label prop', () => {
    expect(wrapper.text()).to.contain(label);
  });

  it('should render all values', () => {
    expect(wrapper.find('input[type=\'number\']').length).to.equal(5);
  });
});
