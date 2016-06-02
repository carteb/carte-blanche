import { combineReducers } from 'redux';
import currentUser from './currentUser';
import contacts from './contacts';

const rootReducer = combineReducers({
  currentUser,
  contacts,
});

export default rootReducer;
