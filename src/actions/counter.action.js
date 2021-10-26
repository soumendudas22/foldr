import * as actions from '@util/action.type';

export const incrementCount = () => {
  return {
    type: actions.INCREMENT_COUNT
  }
}

export const decrementCount = () => {
  return {
    type: actions.DECREMENT_COUNT
  }
}