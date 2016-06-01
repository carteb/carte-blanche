/* @flow */

import * as types from '../constants/ActionTypes';

type ActionTypes = 'ADD_USER';

type Action = {
  type: ActionTypes,
};

export function addUser(firstName: string, lastName: string, imgurl: string): Action {
  return {
    type: types.ADD_USER,
    firstName,
    lastName,
    imgurl,
  };
}
