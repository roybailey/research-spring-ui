import React from 'react'
import { Link, withRouter } from 'react-router-dom'


const AuthButton = withRouter(({ history }) => (
  window.fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => { history.push('/logout') }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))


export default () => (
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
                    <p>To get started, edit <code>src/App.js</code> and save to reload.</p>
                    <AuthButton/>
                </div>
            </div>
        </div>
    </div>
)