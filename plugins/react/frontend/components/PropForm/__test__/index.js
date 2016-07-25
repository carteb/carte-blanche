import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import PropForm from '../index';
import RandomButton from '../../form/RandomButton';

// controls
const EnumControl = () => <div>EnumControl</div>;
const IntegerControl = ({ onUpdate, min, max }) => <div>
  Integer Control
  <span id="click-int" onClick={onUpdate}>Click</span>
  <span>min: {min}</span>
  <span>max: {max}</span>
</div>;
const StringControl = ({ title }) => <div>StringControl {title}</div>;

// props
const onRandomClick = sinon.spy();
const onVariationPropsChange = sinon.spy();
const variationProps = {
  children: 'some-button-text',
  className: 'btn-class',
  type: 'submit',
};
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

let wrapper;

describe('<PropForm />', () => {
  beforeEach(() => {
    wrapper = shallow(<PropForm
      variationPath="abc"
      variationProps={variationProps}
      onRandomClick={onRandomClick}
      metadataWithControls={metadataWithControls}
      onVariationPropsChange={onVariationPropsChange}
    />);
  });

  it('should render the random button', () => {
    expect(wrapper.containsMatchingElement(<RandomButton />)).to.equal(true);
  });

  it('should render all controls', () => {
    expect(wrapper.containsMatchingElement(<EnumControl />)).to.equal(true);
    expect(wrapper.containsMatchingElement(<IntegerControl />)).to.equal(true);
    expect(wrapper.containsMatchingElement(<StringControl />)).to.equal(true);
  });

  it('should call onVariationChange when clicking on control', () => {
    wrapper = mount(<PropForm
      variationPath="abc"
      variationProps={variationProps}
      onRandomClick={onRandomClick}
      metadataWithControls={metadataWithControls}
      onVariationPropsChange={onVariationPropsChange}
    />);
    const randomBtn = wrapper.find('#click-int');
    randomBtn.simulate('click');
    sinon.assert.calledOnce(onVariationPropsChange);
  });
});
