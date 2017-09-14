import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form/immutable'

import { loginRequest } from '../store/user-store'

import './Login.css';


export class LoginContainer extends Component {

  render() {
    const { handleSubmit, loginRequest } = this.props;
    let handleFormSubmit = (formProps) => {
        console.log('LoginForm.handleFormSubmit() '+JSON.stringify(formProps));
        loginRequest({
            username: formProps.get('username'),
            password: formProps.get('password')
        });
    };

    return (
    <div id="LoginBox" className="ui middle aligned center aligned grid">
      <div className="column LoginColumn">
        <h2 className="ui teal image header">
          <div className="content">
            Login to your account
          </div>
        </h2>
        <form className="ui large form" onSubmit={handleSubmit(handleFormSubmit.bind(this))}>
          <div className="ui stacked segment">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon"></i>
                <Field className="prompt" name="username" component="input" type="text" placeholder="username..."/>
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <Field className="prompt" name="password" component="input" type="password" placeholder="password..."/>
              </div>
            </div>
            <button className="ui teal button">Login</button>
          </div>

          <div className="ui error message"></div>
        </form>
      </div>
    </div>
    )
  }

}

export default reduxForm({
   form: 'loginForm'
})(connect(null, { loginRequest })(LoginContainer))
