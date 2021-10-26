import counter from '@reducers/counter.reducer';
import auth from "@reducers/auth.reducer";
import bookmark from "@reducers/bookmark.reducer"

import { combineReducers } from 'redux';

export default combineReducers({
  counter,
  auth,
  bookmark
})

