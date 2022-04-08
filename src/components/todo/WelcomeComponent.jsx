import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import HelloWorldService from "./api/todo/HelloWorldService.js";

class WelcomeComponent extends Component {
    constructor(props) {
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.handleSuccesfulResponse = this.handleSuccesfulResponse.bind(this)
        this.handleBeanReturned = this.handleBeanReturned.bind(this)
        this.retrieveHelloBean = this.retrieveHelloBean.bind(this)
        this.retrieveHelloMessageUser = this.retrieveHelloMessageUser.bind(this)
        this.handleUserMessage = this.handleUserMessage.bind(this)
        this.handleErrorResponse = this.handleErrorResponse.bind(this)
        this.state = {
            welcomeMessage : '',
            welcomeMessageBean : '',
            welcomeMessageUser : '',
            errorMessage : '',
            isError: false
        }
    }

    render() {
        return (
            <div className="WelcomeComponent">
                <h1>Welcome</h1>
                <div className="container">
                    <p>Hello {this.props.params.name}. You can manage your todos <Link to="/todos">here</Link>.</p>
                </div>
                <div className="container">
                    <p>Click here to get a customized welcome message</p>
                    <button className="btn btn-success" onClick={this.retrieveWelcomeMessage}>Get Welcome Message</button>
                </div>
                <div className="container">
                    <p>{this.state.welcomeMessage}</p>
                </div>
                <div className="container">
                    <p>Click here to get a customized welcome message bean</p>
                    <button className="btn btn-success" onClick={this.retrieveHelloBean}>Get Welcome Message Bean</button>
                </div>
                <div className="container">
                    <p>{this.state.welcomeMessageBean}</p>
                </div>
                <div className="container">
                    <p>Click here to get a customized welcome message for logged in user</p>
                    <button className="btn btn-success" onClick={this.retrieveHelloMessageUser}>Get Welcome Message User</button>
                </div>
                <div className="container">
                    <p>{this.state.welcomeMessageUser}</p>
                </div>
                <div className="container">
                    {this.state.isError && <p className="alert alert-danger">{this.state.errorMessage}</p>}
                </div>
            </div>
        )
    }

    retrieveWelcomeMessage() {
       HelloWorldService.executeHelloWorldService()
       .then(response => this.handleSuccesfulResponse(response))
       .catch( error => this.handleErrorResponse(error))
    }

    retrieveHelloBean() {
       HelloWorldService.executeHelloWorldServiceBean()
       .then(response => this.handleBeanReturned(response))
       .catch( error => this.handleErrorResponse(error))
    }

    retrieveHelloMessageUser() {
        let name = this.props.params.name;
        console.log(name);
        HelloWorldService.executeHelloWorldPathVariableService(name)
        .then(response => this.handleUserMessage(response))
        .catch( error => this.handleErrorResponse(error))
    }

    handleSuccesfulResponse(response) {

        this.setState({
            welcomeMessage : response.data,
            isError : false
        })

    }

    handleErrorResponse(error) {
        console.log(error.response)

        let errorMessage = ''
        if(error.message)
            errorMessage += error.message

        if (error.response && error.response.data) {
             errorMessage += error.message
        }
        this.setState({
            errorMessage: errorMessage,
            isError: true
        })
    }

    handleBeanReturned(response) {
        console.log(response.data)
        this.setState({welcomeMessageBean: response.data.message,isError : false})
    }

    handleUserMessage(response) {
        this.setState({
            welcomeMessageUser: response.data.message,
            isError : false
        })
    }
}
export default WelcomeComponent 