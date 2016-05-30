import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import ObjectControl from '../index';

// controls
const IntegerControl = ({ onUpdate, min, max }) => <div>
  Integer Control
  <span id="click-int" onClick={onUpdate}>Click</span>
  <span>min: {min}</span>
  <span>max: {max}</span>
</div>;
const StringControl = ({ title }) => <div>StringControl {title}</div>;

const label = 'object-control';
const onUpdate = sinon.spy();
const value = {
  foo: 'Some String Value',
  bar: 100,
};
const propTypeData = {
  name: 'shape',
  required: false,
  value: {
    foo: {
      control: StringControl,
      name: 'string',
      required: false,
    },
    bar: {
      control: IntegerControl,
      name: 'number',
      required: false,
    },
  },
};
let props;
let wrapper;

describe('<ObjectControl />', () => {
  beforeEach(() => {
    props = { label, onUpdate, value, propTypeData, isNested: false };
    wrapper = mount(<ObjectControl {...props} />);
  });

  it('should render label prop', () => {
    expect(wrapper.text()).to.contain(label);
  });

  it('should call onUpdate() when clicking on random', () => {
    const clickBtn = wrapper.find('svg').first();
    clickBtn.simulate('click');
    sinon.assert.calledOnce(onUpdate);
    onUpdate.reset();
  });
});
