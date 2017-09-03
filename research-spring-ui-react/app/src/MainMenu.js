import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Input, Menu } from 'semantic-ui-react'


function LoginButton(props) {
  return (
    <Link to="/login" className="item">Login</Link>
  );
}


function LogoutButton(props) {
  return (
    <Menu.Item>
        <Link to="/logout">Logout</Link>
    </Menu.Item>
  );
}


class LoginControl extends React.Component {

  render() {
    const isLoggedIn = window.fakeAuth.isAuthenticated; // this.state.isLoggedIn;

    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton />;
    } else {
      button = <LoginButton />;
    }

    return button;
  }
}


export default class MainMenu extends Component {

  render() {
    return (
      <Menu>
        <NavLink to="/" exact activeClassName="active" className="item">Home</NavLink>
        <NavLink to="/about" activeClassName="active" className="item">About</NavLink>
        <NavLink to="/topics" activeClassName="active" className="item">Topics</NavLink>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <LoginControl />
        </Menu.Menu>
      </Menu>
    )
  }
}
