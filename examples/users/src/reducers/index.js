import { combineReducers } from 'redux';
import currentUser from './currentUser';
import contacts from './contacts';
import calls from './calls'

const rootReducer = combineReducers({
  currentUser,
  contacts,
  calls
});

export default rootReducer;
