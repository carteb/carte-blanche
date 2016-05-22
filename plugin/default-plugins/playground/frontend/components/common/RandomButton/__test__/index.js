import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import RandomButton from '../index';

describe('<RandomButton />', () => {
  it('should call the onClick prop on click', () => {
    const onRandomClick = sinon.spy();
    const component = shallow(<RandomButton onClick={onRandomClick} id="test" />);
    const btn = component.find('div').first();
    btn.simulate('click');
    sinon.assert.calledOnce(onRandomClick);
  });
});
