import React from 'react'
import { connect } from 'react-redux'


const User = ({ user }) => (
    <div className="ui vertical stripe segment">
        <div className="ui middle aligned stackable grid container">
            <div className="row">
                <div className="center aligned column">
                    <h3 className="ui header">This page is Authenticated user Protected</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
            <div className="row">
                <div className="center aligned column">
                    <a className="ui huge button">You are logged in as User {user.get('username')}</a>
                </div>
            </div>
        </div>
    </div>
)


export default connect(state => ({ user: state.getIn(['user']) }))(User)
