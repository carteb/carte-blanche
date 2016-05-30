import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import BooleanControl from '../index';

const label = 'a boolean control';
const secondaryLabel = 'secondary';
const onUpdate = sinon.spy();
const value = true;
let props;
let wrapper;

describe('<BooleanControl />', () => {
  beforeEach(() => {
    props = { label, onUpdate, value, secondaryLabel };
    wrapper = mount(<BooleanControl {...props} />);
  });

  it('should render label prop', () => {
    expect(wrapper.text()).to.contain(label);
  });

  it('should render secondary label prop', () => {
    expect(wrapper.text()).to.contain(secondaryLabel);
  });
});
