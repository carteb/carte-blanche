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

  it('should call updateCustomMetadata when changing min value ', () => {
    const maxInput = wrapper.find('#Min');
    maxInput.simulate('change', { target: { value: 4 } });
    sinon.assert.calledWith(updateCustomMetadata, {
      props: { className: { constraints: { min: 4 }, controlType: 'number' } },
    });
  });

  it('should call call updateCustomMetadata when changing max value', () => {
    const maxInput = wrapper.find('#Max');
    maxInput.simulate('change', { target: { value: 100 } });
    sinon.assert.calledWith(updateCustomMetadata, {
      props: { className: { constraints: { max: 100 }, controlType: 'number' } },
    });
  });

  it('should call calls updateCustomMetadata when selecting option', () => {
    const select = wrapper.find('select').first();
    select.simulate('change');
    sinon.assert.calledWith(updateCustomMetadata, {
      props: { className: { controlType: 'number' } },
    });
  });

  it('should call updateCustomMetadata with controlType enum when selecting option enum', () => {
    const select = wrapper.find('select').first();
    select.simulate('change', { target: { value: 'enum' } });
    sinon.assert.calledWith(updateCustomMetadata, {
      props: { className: { controlType: 'enum' } },
    });
  });
});
