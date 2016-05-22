import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import Playground from '../index';

const component = ({ className, type, children }) => (
  <div
    className={className}
    type={type}
  >
    {children}
  </div>
);
const onEditButtonClick = sinon.spy();
const onDeleteButtonClick = sinon.spy();
const title = 'test-title';
const variationPath = 'testVariation';
let wrapper;
let props;

describe('<Playground />', () => {
  beforeEach(() => {
    const variationProps = {
      children: 'random content',
      className: 'random-class-name',
      type: 'button',
    };

    props = { title, variationPath, component, variationProps, onEditButtonClick, onDeleteButtonClick }; // eslint-disable-line max-len
    wrapper = mount(<Playground {...props} />);
  });

  it('should render title prop', () => {
    expect(wrapper.find('h3').text()).to.equal(title);
  });

  it('should render an iframe', () => {
    expect(wrapper.find('iframe').length).to.equal(1);
  });

  it('should render a <Card />', () => {
    wrapper = shallow(<Playground {...props} />);
    expect(wrapper.text()).to.contain('<Card />');
  });

  it('show call onEditButtonClick when clicking editButtonClick', () => {
    const clickBtn = wrapper.find('button').first();
    clickBtn.simulate('click');
    sinon.assert.calledWith(onEditButtonClick, props.variationPath);
  });

  it('should call onDeleteButtonClick when clicking deleteButtonClick', () => {
    const clickBtn = wrapper.find('button').last();
    clickBtn.simulate('click');
    sinon.assert.calledWith(onDeleteButtonClick, props.variationPath);
  });
});
