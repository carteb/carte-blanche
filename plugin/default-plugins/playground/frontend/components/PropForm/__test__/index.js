import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import PropForm from '../index';

describe('<PropForm />', () => {
  it('contains h2 header', () => {
    const propForm = shallow(<PropForm />);
    expect(propForm.contains(<h2>Props</h2>)).to.equal(true);
  });
});
