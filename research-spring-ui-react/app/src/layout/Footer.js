import React from 'react'
import { Link } from 'react-router-dom'
import { userIsAuthenticated } from '../auth'
import { connect } from 'react-redux'
import { logoutRequest } from '../store/user-store'


const LogoutLink = userIsAuthenticated(({ logout }) => (
    <a className="ui label small" onClick={() => logout()}>Logout</a>
))

//    <button onClick={() => { history.push('/logout') }}>Sign out</button>

const LoggedInMessage = ({ user }) => {
  user = (user)? user.toJS() : null;
  console.log((user)? JSON.stringify(user): 'no auth data');
  return user && user.isAuthenticated? (
    <p>
      Welcome! You are logged in as {user.username}
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
}


const Footer = ({ user, logoutRequest }) => (
    <div className="ui inverted vertical footer segment">
        <div className="ui container">
            <div className="ui stackable inverted divided equal height stackable grid">
                <div className="three wide column">
                    <h4 className="ui inverted header">About</h4>
                    <div className="ui inverted link list">
                        <Link to="/" className="item">Home</Link>
                        <Link to="/about" className="item">About</Link>
                        <Link to="/topics" className="item">Topics</Link>
                    </div>
                </div>
                <div className="three wide column">
                    <h4 className="ui inverted header">Services</h4>
                    <div className="ui inverted link list">
                        <Link to="/" className="item">Home</Link>
                        <Link to="/about" className="item">About</Link>
                        <Link to="/topics" className="item">Topics</Link>
                    </div>
                </div>
                <div className="ten wide column">
                    <h4 className="ui inverted header">Footer Header</h4>
                    <LoggedInMessage user={user} />
                    <LogoutLink logout={logoutRequest}/>
                </div>
            </div>
        </div>
    </div>
)

export default connect(state => ({ user: state.getIn(['user']) }), { logoutRequest })(Footer)
