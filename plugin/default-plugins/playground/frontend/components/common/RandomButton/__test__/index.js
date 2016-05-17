import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import RandomButton from '../index';

describe('<RandomButton />', () => {
  it('on click calls the onClick prop', () => {
    const onRandomClick = sinon.spy();
    const component = shallow(<RandomButton onClick={onRandomClick} id="test" />);
    const btn = component.find('div').first();
    btn.simulate('click');
    sinon.assert.calledOnce(onRandomClick);
  });
});
