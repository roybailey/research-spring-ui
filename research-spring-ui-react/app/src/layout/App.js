import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  withRouter,
  Redirect,
  Route
} from 'react-router-dom'

import MainMenu from './MainMenu';
import Footer from './Footer'

import './App.css';

import Home from '../content/Home'
import About from '../content/About'
import Login from '../content/Login'
import Topics from '../content/Topics'


window.fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 2000)
  }
}


const Logout = withRouter(({history}) => {
    window.fakeAuth.signout(() => {
        console.log('redirecting to /login with history' +history);
        history.push('/login');
    });
    console.log('showing logout message');
    return(
    <div>
        <p>You are now logged out.</p>
    </div>
    )
})


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    window.fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)


class App extends Component {
  render() {
    return (
       <Router>
          <div className="pushable App">
            <MainMenu />

            <div className="ui vertical stripe segment">
                <div className="pusher">
                    <Route exact path="/" component={Home}/>
                    <Route path="/about" component={About}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/logout" component={Logout}/>
                    <PrivateRoute path="/topics" component={Topics}/>
                </div>
            </div>

            <Footer/>
          </div>
      </Router>
    );
  }
}


export default App;
