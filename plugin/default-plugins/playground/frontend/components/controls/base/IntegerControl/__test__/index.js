import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import IntegerControl from '../index';

const label = 'integer-control';
const onUpdate = sinon.spy();
const value = 1;
let props;
let wrapper;

describe('<IntegerControl />', () => {
  beforeEach(() => {
    props = { label, onUpdate, value, isNested: false };
    wrapper = mount(<IntegerControl {...props} />);
  });

  it('should render label prop', () => {
    expect(wrapper.text()).to.contain(label);
  });

  it('should render initial value', () => {
    expect(wrapper.find('#integer-control').props().value).to.equal(value);
  });

  it('should call onUpdate() when changing value', () => {
    const input = wrapper.find('#integer-control');
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
