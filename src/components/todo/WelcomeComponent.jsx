import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'

class WelcomeComponent extends Component {
    render() {
        return (
            <div className="WelcomeComponent">
                <h1>Welcome</h1>
                <div className="container">
                    <p>Hello {this.props.params.name}. You can manage your todos <Link to="/todos">here</Link>.</p>
                </div>
                
            </div>
        )
    }
}
export default WelcomeComponent 