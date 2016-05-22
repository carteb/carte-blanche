import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import Modal from '../index';

let onCloseClick;
let wrapper;
let props;

describe('<Modal />', () => {
  beforeEach(() => {
    onCloseClick = sinon.spy();
    props = { visible: true, children: 'test-drive', onCloseClick };
    wrapper = mount(<Modal {...props} />);
  });

  it('should render children prop', () => {
    expect(wrapper.text()).to.contain('test-drive');
  });

  it('should call onCloseClick', () => {
    const btn = wrapper.find('button').first();
    btn.simulate('click');
    sinon.assert.calledOnce(onCloseClick);
  });
});
