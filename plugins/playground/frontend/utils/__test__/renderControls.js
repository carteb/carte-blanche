import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import renderControls from '../renderControls';

const EnumControl = () => <div>Enum Control</div>;
const IntegerControl = ({ onUpdate, min, max }) => <div>
  Integer Control
  <span id="click-int" onClick={onUpdate}>Click</span>
  <span>min: {min}</span>
  <span>max: {max}</span>
</div>;
const StringControl = () => <div>String Control</div>;

const setGlobalComponentProps = sinon.spy();
const globalComponentProps = { className: 10, type: 'button', children: 'some button text.' };
let controls;

describe('renderControls', () => {
  beforeEach(() => {
    const metadataWithControls = {
      className: {
        required: false,
        description: '',
        name: 'string',
        control: <IntegerControl min={10} max={100} />,
      },
      type: {
        required: false,
        description: '',
        name: 'enum',
        control: <EnumControl />,
        value: [
          { value: 'submit', computed: false },
          { value: 'reset', computed: false },
          { value: 'button', computed: false },
        ],
      },
      children: {
        required: true,
        description: '',
        name: 'node',
        control: <StringControl title="some-random-title" />,
      },
    };

    controls = renderControls(
      metadataWithControls,
      globalComponentProps,
      setGlobalComponentProps,
    );
  });

  it('should return correct number of elements', () => {
    expect(controls.length).to.equal(3);
  });

  it('should call setGlobalComponentProps correct elements...', () => {
    const [numberElement, enumElement, stringElement] = controls;
    expect(numberElement.type).to.equal(IntegerControl);
    expect(enumElement.type).to.equal(EnumControl);
    expect(stringElement.type).to.equal(StringControl);
  });

  it('should pass the correct initial props', () => {
    const wrapper = mount(<div>{controls[0]}</div>);
    expect(wrapper.text()).to.contain(10);
    expect(wrapper.text()).to.contain(100);
  });

  it('should call setGlobalComponentProps with globalComponentProps', () => {
    const wrapper = mount(<div>{controls[0]}</div>);
    const clickBtn = wrapper.find('#click-int');
    clickBtn.simulate('click');
    sinon.assert.calledWith(setGlobalComponentProps, globalComponentProps);
  });
});
