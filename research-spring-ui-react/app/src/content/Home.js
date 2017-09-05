import React from 'react'
import { Link } from 'react-router-dom'

import './Home.css';


export default () => (
    <div className="ui vertical masthead center aligned segment">
        <div className="ui text container">
            <h1 className="ui header">
                Imagine-a-Company
            </h1>
            <h2>Do whatever you want when you want to.</h2>
            <Link to="/topics">
                <div className="ui huge primary button">Get Started <i className="right arrow icon"></i></div>
            </Link>
        </div>
    </div>
)