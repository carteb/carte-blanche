import * as types from '../constants/ActionTypes';

export function addUser(firstName, lastName) {
  return {
    type: types.ADD_USER,
    firstName,
    lastName,
  };
}
