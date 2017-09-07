import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  withRouter,
  Redirect,
  NavLink,
  Route
} from 'react-router-dom'

import { logout } from '../store/user-store'

import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir, userIsAdminRedir,
         userIsAuthenticated, userIsNotAuthenticated } from '../auth'

import MainMenu from './MainMenu';
import Footer from './Footer'

import './App.css';

import HomePage from '../content/Home'
import AboutPage from '../content/About'
import LoginPage from '../content/Login'
import TopicPage from '../content/Topics'
import UserPage from '../content/User'
import AdminPage from '../content/Admin'


const getUserName = user => {
  if (user.get('data')) {
    return `Welcome ${user.getIn(['data','name'])}`
  }
  return `Not logged in`
}

// Need to apply the hocs here to avoid applying them inside the render method
const Login = userIsNotAuthenticatedRedir(LoginPage)
const User = userIsAuthenticatedRedir(UserPage)
const Admin = userIsAuthenticatedRedir(userIsAdminRedir(AdminPage))

// Only show login when the user is not logged in and logout when logged in
// Could have also done this with a single wrapper and `FailureComponent`
const UserName = ({ user }) => (<div className='ui label'>{getUserName(user)}</div>)
const LoginLink = userIsNotAuthenticated(() => <NavLink activeClassName="active" to="/login">Login</NavLink>)
const LogoutLink = userIsAuthenticated(({ logout }) => (
    <div>
        <p>You are now logged out.</p>
    </div>
))

class App extends Component {
  render() {
    return (
       <Router>
          <div className="pushable App">
            <MainMenu />

            <div className="ui vertical stripe segment">
                <div className="pusher">
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/about" component={AboutPage}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/logout" component={LogoutLink}/>
                    <Route path="/user" component={User}/>
                    <Route path="/admin" component={Admin}/>
                    <Route path="/topics" component={TopicPage}/>
                </div>
            </div>

            <Footer/>
          </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
    console.log('-----------');
    console.log(state.user);
    console.log(state.get('user'));
    console.log('-----------');
    return ({
        user: state.get('user')
    });
};

export default connect(mapStateToProps)(App);
