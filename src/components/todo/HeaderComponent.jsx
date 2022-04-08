import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import AuthenticationService from "./AuthenticationService.js";

class HeaderComponent extends Component {
    render() {

        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        console.log(isUserLoggedIn)


        return(
            <div>
                <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                    <a className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">Todo Application</a>
                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0" style={{width: '50%'}}>
                        {isUserLoggedIn && <li><Link className="nav-link px-2 link-dark" to="/welcome/quedacoder@gmail.com">Home</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link px-2 link-dark" to="/todos">Todos</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link px-2 link-dark" to="/todo">Create Todo Item</Link></li>}
                        
                    </ul>
                    <div className="col-md-3 text-end">
                        <a className="btn btn-outline-primary me-2"><Link className="nav-link px-2 link-dark" to="/login">Login</Link></a>
                        {isUserLoggedIn && <a className="btn btn-primary"><Link className="nav-link px-2 link-dark" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></a>}
                    </div>
                    <hr />
                </header>
            </div>
            
        )
    }
}

export default HeaderComponent