import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { login } from '../store/user-store'

import './Login.css';


export class LoginContainer extends Component {

  static propTypes = {
    login: PropTypes.func.isRequired
  };

  login = (e) => {
    e.preventDefault()
    this.props.login({
      name: this.refs.email.value,
      password: this.refs.password.value,
      isAdmin: false
    })
  };

  render() {
    return (
    <div id="LoginBox" className="ui middle aligned center aligned grid">
      <div className="column">
        <h2 className="ui teal image header">
          <div className="content">
            Login to your account
          </div>
        </h2>
        <form className="ui large form">
          <div className="ui stacked segment">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input type="text" name="email" placeholder="Email address" ref="email" />
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input type="password" name="password" placeholder="Password" ref="password" />
              </div>
            </div>
            <div className="ui fluid large teal submit button" onClick={this.login}>Login</div>
          </div>

          <div className="ui error message"></div>
        </form>
      </div>
    </div>
    )
  }

}

export default connect(null, { login })(LoginContainer)
