import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import EnumControl from '../index';

const label = 'enum control';
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
    props = { label, onUpdate, value, propTypeData };
    wrapper = mount(<EnumControl {...props} />);
  });

  it('should render label prop', () => {
    expect(wrapper.text()).to.contain(label);
  });

  it('should render all options', () => {
    expect(wrapper.find('option').length).to.equal(3);
  });

  it('should call onUpdate() when clicking on random', () => {
    const clickBtn = wrapper.find('svg').first();
    clickBtn.simulate('click');
    const expectedValues = ['a', 'b', 'c', undefined, null];
    const validSelection = sinon.match(obj => expectedValues.indexOf(obj.value) !== -1);
    sinon.assert.calledWithMatch(onUpdate, validSelection);
    onUpdate.reset();
  });

  it('should set the correct value', () => {
    expect(wrapper.find('select').first().props().value).to.equal('a');
  });

  it('should call onUpdate() when changing selection', () => {
    const select = wrapper.find('select').last();
    select.simulate('change', { target: { value: 'b' } });
    sinon.assert.calledWith(onUpdate, { value: 'b' });
    onUpdate.reset();
  });
});
