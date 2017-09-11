import React from 'react'
import { NavLink, Link, withRouter } from 'react-router-dom'
import { Input, Menu, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { logoutRequest } from '../store/user-store'


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


const MainMenu  = ({ user, logoutRequest }) => (
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

export default withRouter(connect(state => ({ user: state.getIn(['user']) }), { logoutRequest })(MainMenu))
