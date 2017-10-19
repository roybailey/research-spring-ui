import { combineReducers } from 'redux'
import { List, Map } from 'immutable'
import moment from 'moment'


// ------------------------------------------------------------
// ACTIONS
// ------------------------------------------------------------

export const EMPTY_MOVIES = 'EMPTY_MOVIES'
export const REQUEST_MOVIES = 'REQUEST_MOVIES'
export const RECEIVE_MOVIES_SUCCESS = 'RECEIVE_MOVIES_SUCCESS'
export const RECEIVE_MOVIES_FAILURE = 'RECEIVE_MOVIES_FAILURE'

const EMPTY_MOVIE_DATA = Map({
                             movies: List([]),
                             total: 0
                           });

const initialMovieState = Map({
  status: EMPTY_MOVIES,
  data: EMPTY_MOVIE_DATA
});


// ------------------------------------------------------------
// REDUCERS
// ------------------------------------------------------------

export const movieReducer = (state = initialMovieState, action) => {
  console.log(JSON.stringify(action));
  console.log(JSON.stringify(state));
  let newState = state;
  switch (action.type) {
    case REQUEST_MOVIES:
      newState = state.merge(Map({
        status: action.type,
        filter: action.filter
      }));
      break;
    case RECEIVE_MOVIES_SUCCESS:
      newState = state.merge(Map({
        status: action.type,
        data: Map(action.data),
        lastUpdated: action.receivedAt
      }));
      break;
    case RECEIVE_MOVIES_FAILURE:
      newState = state.merge(Map({
        status: action.type,
        data: EMPTY_MOVIE_DATA,
        error: action.error,
        lastUpdated: action.receivedAt
      }));
      break;
    default:
      newState = state
  }
  console.log(JSON.stringify(newState));
  return newState;
}

// always export default reducer() function
export const reducers = combineReducers({
  movieReducer
});

export default reducers;


// ------------------------------------------------------------
// ACTION CREATORS
// ------------------------------------------------------------

const API_ROOT = "/api/v1";
//const API_MOVIE = API_ROOT + "/movie";
const API_MOVIE_SEARCH = API_ROOT + "/movie-search";
const API_MOVIE_UPDATE = API_ROOT + "/movie-update";
//const API_PERSON = API_ROOT + "/person";

const shouldFetchMovies = (state, filter) => {
  const movies = state.get('movie').movieReducer
  if (!movies) {
    return true
  }
  return movies.get('status') === EMPTY_MOVIES;
}


export const requestMovies = filter => ({
  type: REQUEST_MOVIES,
  filter
})

export const receiveMovies = (filter, json) => ({
  type: RECEIVE_MOVIES_SUCCESS,
  filter,
  data: json,
  receivedAt: moment().format()
})

export const failureMovies = (filter, error) => ({
  type: RECEIVE_MOVIES_FAILURE,
  filter,
  error: error,
  receivedAt: moment().format()
})

export const fetchMovies = (filter) => (dispatch) => {
  console.log('!!!!! FETCH MOVIES !!!!! '+JSON.stringify(filter));
  //console.log('fetchMovies '+filter);
  let queryParams = [];
  if(filter) {
    if(filter.search) queryParams.push(`filter=${filter.search}`);
    if(filter.pageSize) queryParams.push(`pageSize=${filter.pageSize}`);
    if(filter.page) queryParams.push(`page=${filter.page}`);
  }
  let requestMoviesUrl = window.API_BASE_ADDRESS+API_MOVIE_SEARCH+`?${queryParams.join('&')}`;
  console.log('fetchMovies '+requestMoviesUrl);
  dispatch(requestMovies(filter));
  return fetch(requestMoviesUrl)
    .then(response => response.json())
    .then(json => dispatch(receiveMovies(filter, Object.assign({ movies: json}, json.meta))))
    .catch(error => dispatch(failureMovies(filter, "Failed to load movies: "+error)));
}

export const fetchMoviePage = (page) => (dispatch, getState) => {
  console.log('fetchMoviePage '+page);
  let filter = getState().get('movie').movieReducer.get('filter');
  filter.page = page;
  console.log('fetchMoviePage '+JSON.stringify(filter));
  return dispatch(fetchMovies(filter));
}

export const fetchMoviesIfNeeded = (filter) => (dispatch, getState) => {
  if (shouldFetchMovies(getState(), filter)) {
    return dispatch(fetchMovies(filter))
  }
}

export const updateMovieRating = (movieId,rating) => (dispatch) => {
  console.log('updateMovie '+movieId+' rating='+rating);
  let updateMoviesUrl = window.API_BASE_ADDRESS+API_MOVIE_UPDATE;
  console.log('updateMovie '+updateMoviesUrl);
  return fetch(updateMoviesUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: [{ id: movieId, stars: rating }] })
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.error("Failed to update movie: "+error));
}

