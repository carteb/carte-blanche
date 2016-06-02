/* @flow */

import * as types from '../constants/ActionTypes';

type ActionTypes = 'ADD_CONTACT';

type Action = {
  type: ActionTypes,
};

export function addContact(firstName: string, lastName: string, avatarUrl: string): Action {
  return {
    type: types.ADD_CONTACT,
    firstName,
    lastName,
    avatarUrl,
  };
}
