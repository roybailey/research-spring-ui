import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Input, Menu, Dropdown } from 'semantic-ui-react'


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

/*
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
*/

export default class MainMenu extends Component {

  render() {
    return (
      <Menu>
        <NavLink to="/" exact activeClassName="active" className="item">Home</NavLink>
        <NavLink to="/about" activeClassName="active" className="item">About</NavLink>
        <NavLink to="/topics" activeClassName="active" className="item">Topics</NavLink>
        <NavLink to="/user" activeClassName="active" className="item">User</NavLink>
        <NavLink to="/admin" activeClassName="active" className="item">Admin</NavLink>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
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
  }
}
