import { combineReducers } from 'redux-immutable'
import { reducer as formReducer } from 'redux-form/immutable'

import userReducers from './store/user-store'
import movieReducers from './store/movie-store'

const rootReducer = combineReducers({
  user: userReducers,
  movie: movieReducers,
  form: formReducer
})

export default rootReducer
