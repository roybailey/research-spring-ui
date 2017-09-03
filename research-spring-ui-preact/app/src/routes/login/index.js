import { h, Component } from 'preact';
import style from './style';

export default class Login extends Component {
	state = {
	};

	// gets called when this route is navigated to
	componentDidMount() {
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
	}

    _handleSubmit(event) {
        event.preventDefault();

        AuthActions.login(
          React.findDOMNode(this.refs.email).value,
          React.findDOMNode(this.refs.password).value
        );
    }

  	// Note: `user` comes from the URL, courtesy of our router
	render({ user }, { error }) {
        var errorMessage;
        if (error) {
          errorMessage = (
            <div className='state-error' style={{ paddingBottom: 16 }}>
              { error }
            </div>
          );
        }

        var formContent;
        if (user) {
          formContent = (
            <div>
              <p>
                You're logged in as <strong>{ user }</strong>.
              </p>
            </div>
          );
        } else {
          formContent = (
            <div>
              { errorMessage }
              Email: <input defaultValue="iwritecode@preact.com" ref="email" style={{ maxWidth: "100%" }} type="email" />
              <br/>
              Password: <input defaultValue="wearehiring!" ref="password" style={{ maxWidth: "100%" }} type="password" />
              <br/>
              <button onClick={ this.handleLogout }>Log In</button>
            </div>
          );
        }
        return (
          <form onSubmit={this._handleSubmit}>
            { formContent }
          </form>
        );
    }
}
