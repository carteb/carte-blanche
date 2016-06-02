import {
  ADD_CALL,
} from '../constants/ActionTypes';

const initialState = [];

export default function calls(state = initialState, action) {
  switch (action.type) {
    case ADD_CALL:
      return [
        {
          id: (state.reduce((maxId, call) => Math.max(call.id, maxId), -1) + 1).toString(),
          timestamp: action.timestamp,
          duration: action.duration,
          receiverId: action.receiverId
        },
        ...state,
      ];
    default:
      return state;
  }
}
