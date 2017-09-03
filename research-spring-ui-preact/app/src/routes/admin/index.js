import { h, Component } from 'preact';
import style from './style';

export default class Admin extends Component {
	state = {
	};

	// gets called when this route is navigated to
	componentDidMount() {
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({ user }) {
		return (
			<div class={style.admin}>
				<h1>Admin User Page</h1>
				<p>This is a restricted access page { user }.</p>
			</div>
		);
	}
}
