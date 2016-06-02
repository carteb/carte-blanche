import * as types from '../constants/ActionTypes';

export function addContact(firstName, lastName, avatarUrl, phone) {
  return {
    type: types.ADD_CONTACT,
    firstName,
    lastName,
    avatarUrl,
    phone,
  };
}
