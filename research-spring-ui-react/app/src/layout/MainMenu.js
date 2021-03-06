import React from 'react'
import { NavLink, Link, withRouter, Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form/immutable'
import { Input, Menu, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { logoutRequest } from '../store/user-store'
import { fetchMovies } from '../store/movie-store'


function LoginButton(props) {
  return (
    <Link to="/login" className="item">Login</Link>
  );
}


function LogoutButton({ logout }) {
  return (
    <Menu.Item>
        <a onClick={() => logout()}>Logout</a>
    </Menu.Item>
  );
}


const LoginControl = ({ user, logout }) => {
  const isLoggedIn = user.get('isAuthenticated');

  let button = null;
  if (isLoggedIn) {
    button = <LogoutButton logout={ logout }/>;
  } else {
    button = <LoginButton />;
  }

  return button;
}


const MainMenu  = ({ handleSubmit, history, user, logoutRequest, fetchMovies }) => {

    const handleSearchSubmit2 = function(formProps) {
        console.log('MainMenuForm.handleSearchSubmit()');
        console.log(formProps);
        let target = '/search?filter='+formProps.get('search');
        console.log(target);
        fetchMovies({ search: formProps.get('search')});
        return history.replace(target);
    };

  return (
      <Menu>
        <NavLink to="/" exact activeClassName="active" className="item">Home</NavLink>
        <NavLink to="/about" activeClassName="active" className="item">About</NavLink>
        <NavLink to="/topics" activeClassName="active" className="item">Topics</NavLink>
        <NavLink to="/movies" activeClassName="active" className="item">Movies</NavLink>
        <NavLink to="/search" activeClassName="active" className="item">Search</NavLink>
        <NavLink to="/user" activeClassName="active" className="item">User</NavLink>
        <NavLink to="/admin" activeClassName="active" className="item">Admin</NavLink>
        <Menu.Menu position='right'>
          <Menu.Item>
            <form onSubmit={handleSubmit(handleSearchSubmit2.bind(this))}>
                <div className="ui search">
                    <div className="ui icon input">
                        <Field className="prompt" name='search' icon='search' component="input" type="text" placeholder='Search...' />
                        <i className="search icon"></i>
                    </div>
                </div>
            </form>
          </Menu.Item>
          <LoginControl user={user} logout={logoutRequest} />
          <Dropdown text='About' className="ui pointing dropdown link item">
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to="/">Home</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/about">About</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/topics">Topics</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
  )
};


const mapStateToProps = state => {
  return { user: state.getIn(['user']) }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logoutRequest,
        fetchMovies: text => dispatch(fetchMovies(text))
    };
};

const ReduxFormMainMenu = reduxForm({
    form: 'menuSearchForm'
})(MainMenu);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReduxFormMainMenu))

