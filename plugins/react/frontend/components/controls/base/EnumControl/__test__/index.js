import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import EnumControl from '../index';

const label = 'enum control';
const secondaryLabel = 'secondary';
const onUpdate = sinon.spy();
const propTypeData = {
  description: '',
  name: 'enum',
  required: false,
  value: [
    { value: "'a'" },
    { value: "'b'" },
    { value: "'c'" },
  ],
};
const value = 'a';
let props;
let wrapper;

describe('<EnumControl />', () => {
  beforeEach(() => {
    props = { label, onUpdate, value, propTypeData, secondaryLabel };
    wrapper = mount(<EnumControl {...props} />);
  });

  it('should render label prop', () => {
    expect(wrapper.text()).to.contain(label);
  });

  it('should render secondary label prop', () => {
    expect(wrapper.text()).to.contain(secondaryLabel);
  });
});
