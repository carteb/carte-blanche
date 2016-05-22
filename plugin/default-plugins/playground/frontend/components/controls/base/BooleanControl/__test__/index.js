import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import BooleanControl from '../index';

const label = 'a boolean control';
const onUpdate = sinon.spy();
const value = true;
let props;
let wrapper;

describe('<BooleanControl />', () => {
  beforeEach(() => {
    props = { label, onUpdate, value };
    wrapper = mount(<BooleanControl {...props} />);
  });

  it('should render label prop', () => {
    expect(wrapper.text()).to.contain(label);
  });

  it('should call onUpdate() when clicking on random', () => {
    const clickBtn = wrapper.find('svg').first();
    clickBtn.simulate('click');
    sinon.assert.calledWith(onUpdate, sinon.match.hasOwn('value'));
    onUpdate.reset();
  });

  it('should set the correct value', () => {
    expect(wrapper.find('select').first().props().value).to.equal(true);
  });

  it('should call onUpdate() when changing selection', () => {
    const select = wrapper.find('select').last();
    select.simulate('change', { target: { value: false } });
    sinon.assert.calledWith(onUpdate, { value: false });
    onUpdate.reset();
  });
});
