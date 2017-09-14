import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link, withRouter } from 'react-router-dom'

import {
    fetchMovies, fetchMoviesIfNeeded, updateMovieRating,
    EMPTY_MOVIES, REQUEST_MOVIES
} from '../store/movie-store'
import { Loader } from 'semantic-ui-react'
import MovieList from '../component/MovieList'


const ALL_MOVIE_FILTER = { pageSize: 100 }

const MovieCardRaw = ({ match, movies }) => {
    console.log('Showing movie card for '+match.params.movieId)
    let movieId = parseInt(match.params.movieId)
    let movie = movies.filter((movie)=>(movie.id === movieId))[0]
    console.log('Movies=' +movies.length)
    console.log('Movie=' +movie)
    const title = (movie)? movie.title : 'No Movie Selected'
    return (
      <div>
        <h3>({match.params.movieId}) {title}</h3>
      </div>
    )
}
const MovieCard = withRouter(MovieCardRaw)


class MoviePage extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchMoviesIfNeeded(ALL_MOVIE_FILTER))
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props
    dispatch(fetchMoviesIfNeeded(ALL_MOVIE_FILTER))
  }

  handleRefreshClick = (evt) => {
    const { dispatch } = this.props
    evt.preventDefault()
    dispatch(fetchMovies(ALL_MOVIE_FILTER))
  }

  render() {
    const { match } = this.props;
    const { movies } = this.props.data;
    const { isFetching, updateMovieRating, lastUpdated, error } = this.props
    const isEmpty = (movies.length === 0);
    const total = (movies.length || 0);
    console.log(`RENDERING ${movies.length} MOVIES`);
    const onRateMovie = (movieId, evt, { rating, maxRating }) => {
        updateMovieRating(movieId, rating);
    }

    return (
      <div className="ui segment">
        <Route path={`${match.url}/:movieId`}>
            <MovieCard movies={movies}/>
        </Route>
        <Route exact path={match.url} render={() => (
          <h3>Please select a movie.</h3>
        )}/>
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href="/"
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isEmpty
          ? (isFetching ? <Loader active inline='centered'>Loading...</Loader> : <h2>{error? error : 'No results.'}</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <MovieList movies={movies} rateMovie={onRateMovie}/>
              <h2>{total || 0}</h2>
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const storeMovieState = state.get('movie').movieReducer;
  const movieState = (storeMovieState)? storeMovieState.toJS(): {
    status: EMPTY_MOVIES,
    data: {
        movies: []
    }
  };
  const props = {
    isFetching: movieState.status === REQUEST_MOVIES,
    data: movieState.data
  }
  console.log(JSON.stringify(movieState));
  return props;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch,
        fetchMovies: text => dispatch(fetchMovies(text)),
        fetchMoviesIfNeeded: filter => dispatch(fetchMoviesIfNeeded(filter)),
        updateMovieRating: (movieId, rating) => dispatch(updateMovieRating(movieId, rating))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
