import * as actions from '@util/action.type';

const authReducer = (state = {
  email: '',
  success: false, // Initially considered user is not logged in
  name: '',
  picture: '',
  exp: 0,
  errors: []
}, action) => {
  switch (action.type) {
    case actions.LOGIN_SUCCESS: return {
      ...state,
      email: action.payload.email,
      name: action.payload.name,
      picture: action.payload.picture,
      exp: action.payload.exp,
      success: true
    };
    case actions.LOGIN_FAIL: return {
      ...state,
      errors: action.payload,
      success: false
    };
    default: return state;
  }
}

export default authReducer;