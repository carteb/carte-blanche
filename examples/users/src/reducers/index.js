import { combineReducers } from 'redux';
import currentUser from './currentUser';
import users from './users';

const rootReducer = combineReducers({
  currentUser,
  users,
});

export default rootReducer;
