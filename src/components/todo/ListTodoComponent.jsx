import React, {Component} from "react";
import TodoDataService from "./api/todo/TodoDataService.js";
import AuthenticationService from "./AuthenticationService.js";

class ListTodoComponent extends Component {
    
    constructor(props) {
        super(props)
        this.handleSuccessTodoList = this.handleSuccessTodoList.bind(this)
        this.handleError = this.handleError.bind(this)
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.updateClicked = this.updateClicked.bind(this)
        this.state = {
            todo: [],
            errorMessage: '',
            message: '',
            isSuccess: false,
            isError: false
        }
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUserName()

        if (username) {
             TodoDataService.retrieveAllTodos(username)
             .then(response => this.handleSuccessTodoList(response))
             .catch(error => this.handleError(error))
        }
    }

    componentDidMount() {
        this.refreshTodos()
    }

    handleSuccessTodoList(response) {

        console.log(response)
        this.setState({
            todo: response.data
        })
    }

    handleError(error) {
        console.log(error.response)
        this.setState({
            errorMessage: error.response.data.message,
            isError: true
        })
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        console.log(id + ' ' + username)
        TodoDataService.deleteTodo(username, id)
        .then(response => {
            this.setState({ message: `Delete of todo ${id} successful!!!`,
                            isSuccess: true })
            this.refreshTodos()
        })
        .catch(error => this.handleError(error))
    }

    updateClicked(id) {
        this.props.navigate(`/todo/${id}`);
    }

    render() {
        return (
            <div className="ListTodoComponent">
               <h1>List Todos</h1>
               <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Done</th>
                                <th>Target Date</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todo.map (
                                    todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button onClick={() => this.deleteTodoClicked(todo.id)} className="btn btn-warning">Delete</button></td>
                                        <td><button onClick={() => this.updateClicked(todo.id)} className="btn btn-info">Update</button></td>
                                    </tr>
                                )
                            }
                            
                        </tbody>
                    </table>
                    <div className="container">
                        {this.state.isError && <p className="alert alert-danger">{this.state.errorMessage}</p>}
                    </div>
                    <div className="container">
                        {this.state.isSuccess && <p className="alert alert-success">{this.state.message}</p>}
                    </div>
               </div>
            </div>
        )
    }
}

export default ListTodoComponent