import React from 'react';
import {
  withRouter,
  Redirect,
  Route
} from 'react-router-dom'


export default withRouter(({history}) => {
    console.log('showing login message');
    return(
    <div>
        <p>You are being logged in...</p>
    </div>
    )
})
