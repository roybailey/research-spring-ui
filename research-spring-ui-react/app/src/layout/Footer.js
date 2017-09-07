import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { userIsAuthenticated } from '../auth'
import { connect } from 'react-redux'
import { logout } from '../store/user-store'


const LogoutLink = userIsAuthenticated(({ logout }) => (
    <a className="ui label small" onClick={() => logout()}>Logout</a>
))

//    <button onClick={() => { history.push('/logout') }}>Sign out</button>

const LoggedInMessage = ({ authData }) => {
  let user = (authData)? authData.toJS() : null;
  console.log((user)? JSON.stringify(user): 'no auth data');
  return user? (
    <p>
      Welcome! You are logged in as {user.name}
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
}


const Footer = ({ authData, logout }) => (
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
                    <LoggedInMessage authData={authData} />
                    <LogoutLink logout={logout}/>
                </div>
            </div>
        </div>
    </div>
)

export default connect(state => ({ authData: state.getIn(['user','data']) }), { logout })(Footer)
