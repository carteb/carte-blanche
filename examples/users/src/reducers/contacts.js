import {
  ADD_CONTACT,
} from '../constants/ActionTypes';

const initialState = [];

export default function contacts(state = initialState, action) {
  switch (action.type) {
    case ADD_CONTACT:
      return [
        {
          id: (state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1).toString(),
          firstName: action.firstName,
          lastName: action.lastName,
          avatarUrl: action.avatarUrl,
        },
        ...state,
      ];
    default:
      return state;
  }
}
