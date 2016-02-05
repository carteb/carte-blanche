/**
 * Mocks the components for easier client developments
 */

console.log('Development Environment, mocking components!');

import React from 'react';
import { STYLEGUIDE } from './constants';

window[STYLEGUIDE] = {
  'src/components/button': {
    'name': 'src/components/button',
    'meta': {
      'description': '',
      'props': {
        'className': {
          'type': {
            'name': 'string'
          },
          'required': false,
          'description': ''
        },
        'type': {
          'type': {
            'name': 'enum',
            'value': [{
              'value': '"submit"',
              'computed': false
            }, {
              'value': '"button"',
              'computed': false
            }, {
              'value': '"reset"',
              'computed': false
            }]
          },
          'required': false,
          'description': ''
        }
      }
    },
    'path': 'src/components/button.js',
    'component': () => {
      return React.createElement(
        'button',
        null,
        'Follow Me'
      );
    }
  }
};

require('./client.js');
