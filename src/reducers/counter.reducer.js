import * as actions from '@util/action.type';

const counterReducer = (state = 0, action) => {
  switch(action.type) {
    case actions.INCREMENT_COUNT: return state + 1;
    case actions.DECREMENT_COUNT: return state - 1;
    default: return state;
  }
}

export default counterReducer;