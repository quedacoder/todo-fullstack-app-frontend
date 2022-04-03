import React, {Component} from "react";
import AuthenticationService from "./AuthenticationService.js";

class LoginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccesMessage: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event) {
        console.log(event.target.value);
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    loginClicked() {

        if (this.state.username==='quedacoder@gmail.com' && this.state.password==='Sdub4life') {
            //put something in session storage
            console.log("passed")
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
            this.props.navigate(`/welcome/${this.state.username}`);
            this.setState({showSuccesMessage: true});
            this.setState({hasLoginFailed: false});
        } else {
            console.log("failed")
            this.setState({showSuccesMessage: false});
            this.setState({hasLoginFailed: true});
        }

    }

    render() {
        return (
            <div className="LoginComponent">
                <h1>Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="messageSpace alert alert-warning">Invalid Credentials</div>}
                    Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
                
            </div>
           
        );
    }
}

export default LoginComponent