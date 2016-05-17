import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import PropForm from '../index';

describe('<PropForm />', () => {
  it('contains <RandomButton />', () => {
    const propForm = shallow(<PropForm />);
    expect(propForm.contains(<h2>Props</h2>)).to.equal(true);
  });
});
