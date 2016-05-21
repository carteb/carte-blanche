import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import CustomMetadataForm from '../index';

let customMetadata;
let parsedMetadata;
let props;
let wrapper;
let updateCustomMetadata;

describe('<CustomMetadataForm />', () => {
  beforeEach(() => {
    updateCustomMetadata = sinon.spy();
    customMetadata = { props: { className: { controlType: 'number' } } };
    parsedMetadata = { description: 'Button component',
      props: {
        className: { required: false, description: '', name: 'string' },
        type: { required: false, description: '', name: 'enum', value: [
          { value: 'submit', computed: false },
          { value: 'button', computed: false },
          { value: 'reset', computed: false },
        ] },
        children: { required: true, description: '', name: 'node' },
      },
    };
    props = { customMetadata, parsedMetadata, updateCustomMetadata };
    wrapper = mount(<CustomMetadataForm {...props} />);
  });

  it('changing min value calls updateCustomMetadata', () => {
    const maxInput = wrapper.find('#Min');
    maxInput.simulate('change', { target: { value: 4 } });
    sinon.assert.calledWith(updateCustomMetadata, {
      props: { className: { constraints: { min: 4 }, controlType: 'number' } },
    });
  });

  it('changing max value calls updateCustomMetadata', () => {
    const maxInput = wrapper.find('#Max');
    maxInput.simulate('change', { target: { value: 100 } });
    sinon.assert.calledWith(updateCustomMetadata, {
      props: { className: { constraints: { max: 100 }, controlType: 'number' } },
    });
  });

  it('select calls updateCustomMetadata', () => {
    const select = wrapper.find('select').first();
    select.simulate('change');
    sinon.assert.calledWith(updateCustomMetadata, {
      props: { className: { controlType: 'number' } },
    });
  });

  it('select option enum calls updateCustomMetadata with controlType enum', () => {
    const select = wrapper.find('select').first();
    select.simulate('change', { target: { value: 'enum' } });
    sinon.assert.calledWith(updateCustomMetadata, {
      props: { className: { controlType: 'enum' } },
    });
  });
});
