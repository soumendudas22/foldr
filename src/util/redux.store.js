import { createStore, applyMiddleware } from 'redux';
import reducers from '@util/combineReducers';
import thunk from "redux-thunk"

export const store = createStore(
  reducers, 
  applyMiddleware(thunk),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );