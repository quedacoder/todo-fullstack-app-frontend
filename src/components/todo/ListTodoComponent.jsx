import React, {Component} from "react";

class ListTodoComponent extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            todo: [
                {id: 1, description: 'Learn to Dance', done: false, targetDate: new Date(2022, 3, 15)},
                {id: 2, description: 'Learn Become Expert at React', done: false, targetDate: new Date(2022, 6, 1)},
                {id: 3, description: 'Move to Dallas', done: false, targetDate: new Date(2022, 11, 1)}
            ]
        }
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
                                    </tr>
                                )
                            }
                            
                        </tbody>
                    </table>
               </div>
            </div>
        )
    }
}

export default ListTodoComponent