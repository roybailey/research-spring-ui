import React from 'react'
import { connect } from 'react-redux'
import MovieSearchForm from '../component/MovieSearchForm'
import MovieList from '../component/MovieList'
import { Loader } from 'semantic-ui-react'
import { fetchMovies, fetchMoviePage, updateMovieRating, EMPTY_MOVIES, REQUEST_MOVIES } from '../store/movie-store'


let MovieSearchPage = (props) => {
    const { fetchMovies, fetchMoviePage, updateMovieRating, isFetching } = props;
    const { movies, total, page, pageSize, pageTotal } = props.data;
    const isEmpty = movies.length === 0;
    const onSubmit = (event) => {
        console.log('MovieSearchPage.onSubmit() '+event);
        fetchMovies(event);
    };
    const onRateMovie = (movieId, evt, { rating, maxRating }) => {
        updateMovieRating(movieId, rating);
    }
    return (
        <div className="ui segment">
            <MovieSearchForm onSubmit={onSubmit} />
            <div className="ui divider"/>
            {isEmpty
              ? (isFetching ? <Loader active inline='centered'>Loading...</Loader> : <h2>No results</h2>)
              : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                  <MovieList
                    movies={movies}
                    total={total}
                    page={page}
                    pageSize={pageSize}
                    pageTotal={pageTotal}
                    fetchMoviePage={fetchMoviePage}
                    rateMovie={onRateMovie}
                    />
                </div>
            }
        </div>
    );
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
        fetchMovies: text => dispatch(fetchMovies(text)),
        fetchMoviePage: page => dispatch(fetchMoviePage(page)),
        updateMovieRating: (movieId, rating) => dispatch(updateMovieRating(movieId, rating))
    };
};

export default MovieSearchPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieSearchPage);
