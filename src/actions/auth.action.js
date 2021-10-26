import * as actions from '@util/action.type';

export const loginSuccess = ({ email, exp, name, picture, success = true }) => {
  return {
    type: actions.LOGIN_SUCCESS,
    payload: {
      email, exp, name, picture, success
    }
  }
}

export const loginFail = ({ refreshToken, success, token, errors }) => {
  return {
    type: actions.LOGIN_FAIL,
    payload: {
      refreshToken,
      success, 
      token,
      errors
    }
  }
}