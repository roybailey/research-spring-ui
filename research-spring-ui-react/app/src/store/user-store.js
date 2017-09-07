import * as constants from '../constant'
import { List, Map } from 'immutable'


// ------------------------------------------------------------
// ACTIONS
// ------------------------------------------------------------

export const login = data => dispatch => {
  dispatch({
    type: constants.USER_LOGGING_IN
  })
  // Wait 2 seconds before "logging in"
  setTimeout(() => {
    dispatch({
      type: constants.USER_LOGGED_IN,
      payload: data
    })
  }, 2000)
}

export function logout() {
  return {
    type: constants.USER_LOGGED_OUT
  }
}


// ------------------------------------------------------------
// REDUCERS
// ------------------------------------------------------------

const initialState = Map({
                       data: null,
                       isLoading: false,
                       message: "initial"
                     });


export default function userUpdate(state = initialState, { type, payload }) {
  switch (type) {
    case constants.USER_LOGGING_IN:
      return state.merge(Map({
                    isLoading: true,
                    message: type
                }));
    case constants.USER_LOGGED_IN:
      return state.merge(Map({
                    data: Map(payload),
                    isLoading: false,
                    message: type
                }));
    case constants.USER_LOGGED_OUT:
      return initialState
    default:
      return state
  }
}
