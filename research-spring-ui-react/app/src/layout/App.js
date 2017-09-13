import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir, userIsAdminRedir,
         userIsAuthenticated, /*userIsNotAuthenticated*/ } from '../auth'

import MainMenu from './MainMenu';
import Footer from './Footer'

import './App.css';

import HomePage from '../content/Home'
import AboutPage from '../content/About'
import LoginPage from '../content/Login'
import TopicPage from '../content/Topics'
import MoviePage from '../content/Movies'
import SearchPage from '../content/MovieSearch'
import UserPage from '../content/User'
import AdminPage from '../content/Admin'


// Need to apply the hocs here to avoid applying them inside the render method
const Login = userIsNotAuthenticatedRedir(LoginPage)
const User = userIsAuthenticatedRedir(UserPage)
const Movies = userIsAuthenticatedRedir(MoviePage)
const Admin = userIsAuthenticatedRedir(userIsAdminRedir(AdminPage))

// Only show login when the user is not logged in and logout when logged in
// Could have also done this with a single wrapper and `FailureComponent`
const LoggedOut = userIsAuthenticated(() => (
    <div>
        <p>You are now logged out.</p>
    </div>
))

class App extends Component {
  render() {
    return (
       <Router basename="/app">
          <div className="pushable App">
            <MainMenu/>

            <div className="ui vertical stripe segment">
                <div className="pusher">
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/about" component={AboutPage}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/logout" component={LoggedOut}/>
                    <Route path="/user" component={User}/>
                    <Route path="/admin" component={Admin}/>
                    <Route path="/topics" component={TopicPage}/>
                    <Route path="/movies" component={MoviePage}/>
                    <Route path="/search" component={SearchPage}/>
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
    console.log(state.get('user').toJS());
    console.log('-----------');
    return ({
        user: state.get('user')
    });
};

export default connect(mapStateToProps)(App);
