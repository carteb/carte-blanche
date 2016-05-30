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
});
