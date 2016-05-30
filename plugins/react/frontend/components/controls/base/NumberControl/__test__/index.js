import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import NumberControl from '../index';

const label = 'integer-control';
const secondaryLabel = 'secondary';
const onUpdate = sinon.spy();
const value = 1;
let props;
let wrapper;

describe('<NumberControl />', () => {
  beforeEach(() => {
    props = { label, onUpdate, value, nestedLevel: 0, secondaryLabel };
    wrapper = mount(<NumberControl {...props} />);
  });

  it('should render label prop', () => {
    expect(wrapper.text()).to.contain(label);
  });

  it('should render secondary label prop', () => {
    expect(wrapper.text()).to.contain(secondaryLabel);
  });
});
