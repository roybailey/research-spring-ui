import { Map } from 'immutable'

// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

const LOCAL_AUTH = 'auth'


function loginRequestAction(credentials) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    credentials
  }
}

function loginSuccessAction(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user
  }
}

function loginFailureAction(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}


function logoutRequestAction() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function logoutSuccessAction() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}


// ------------------------------------------------------------
// ACTIONS
// ------------------------------------------------------------

// Calls the API to get a token and dispatches actions along the way
export function loginRequest(credentials) {

  let jsonRequest = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(loginRequestAction(credentials));

    return fetch(window.API_BASE_ADDRESS+'/public/login', jsonRequest)
      .then(response => response.json().then(user => ({ user, response })))
      .then(({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginFailureAction(user.message))
          return Promise.reject(user)
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem(LOCAL_AUTH, JSON.stringify(user))
          // Dispatch the success action
          dispatch(loginSuccessAction(user))
        }
      })
      .catch(err => console.log("Login Error: ", err))
  }
}

// Logs the user out
export function logoutRequest() {
  return dispatch => {
    dispatch(logoutRequestAction())
    localStorage.removeItem(LOCAL_AUTH)
    dispatch(logoutSuccessAction())
  }
}

// ------------------------------------------------------------
// REDUCERS
// ------------------------------------------------------------

function authFromLocalStorage() {
  if(localStorage.getItem(LOCAL_AUTH)) {
    try {
      let auth = JSON.parse(localStorage.getItem(LOCAL_AUTH))
      return {
        isFetching: false,
        isAuthenticated: auth.isAuthenticated,
        username: auth.username,
        isAdmin: auth.admin
      }
    } catch(error) {
      console.log("Failed to read authorization data from local storage: "+error)
    }
  }
  return {
   isFetching: false,
   isAuthenticated: false
  }
}

const initialState = Map(authFromLocalStorage());

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function userReducer(state = initialState, action) {
  switch (action.type) {

    case LOGIN_REQUEST:
      return state.merge(Map({
            isFetching: action.isFetching,
            isAuthenticated: action.isAuthenticated,
            username: action.credentials.username
         }))

    case LOGIN_SUCCESS:
      return state.merge(Map({
            isFetching: action.isFetching,
            isAuthenticated: action.isAuthenticated,
            username: action.user.username,
            isAdmin: action.user.admin,
            errorMessage: ''
         }));

    case LOGIN_FAILURE:
      return state.merge(Map({
            isFetching: action.isFetching,
            isAuthenticated: action.isAuthenticated,
            errorMessage: action.message
         }));

    case LOGOUT_SUCCESS:
      return initialState

    default:
      return state
  }
}

