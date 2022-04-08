import React, {Component} from "react";
import './LoginComponent.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import withNavigation from "./LoginComponentWithNavigation";
import withParams from "./withParams";
import AuthenticatedRoute from "./AuthenticatedRoute.jsx";
import LoginComponent from "./LoginComponent";
import ListTodoComponent from "./ListTodoComponent";
import HeaderComponent from "./HeaderComponent";
import WelcomeComponent from "./WelcomeComponent";
import ErrorComponent from "./ErrorComponent"; 
import LogoutComponent from "./LogoutComponent";
import FooterComponent from "./FooterComponent";
import TodoDataService from "./api/todo/TodoDataService";
import TodoComponent from "./TodoComponent";
import CreateTodoComponent from "./CreateTodoComponent";

class TodoApp extends Component {
    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
        const ListTodosComponentWithNavigation = withNavigation(ListTodoComponent);
        const TodoComponentWithNavigationAndParams = withParams(withNavigation(TodoComponent));
        const CreateTodoComponentWithNavigation = withNavigation(CreateTodoComponent)
        return (
            <div className="TodoApp">
                <Router>
                    <HeaderComponentWithNavigation/>
                    <Routes>
                        <Route path="/" element={<LoginComponentWithNavigation />} />
                        <Route path="/login" element={<LoginComponentWithNavigation />} />
                        <Route path="/welcome/:name" element={<AuthenticatedRoute>
                                                                <WelcomeComponentWithParams />
                                                              </AuthenticatedRoute>} />
                        <Route  path="/todos" element={<AuthenticatedRoute>
                                                            <ListTodosComponentWithNavigation />
                                                       </AuthenticatedRoute>} />
                        <Route  path="/logout" element={<AuthenticatedRoute><LogoutComponent /></AuthenticatedRoute>} />
                        <Route path="/todo" element={<AuthenticatedRoute><CreateTodoComponentWithNavigation/></AuthenticatedRoute>} />
                        <Route path="/todo/:id" element={<AuthenticatedRoute><TodoComponentWithNavigationAndParams /></AuthenticatedRoute>} />
                        <Route path="*" element={<ErrorComponent />} />
                    </Routes>
                    <FooterComponent />
                </Router>
            </div>
        )
    }
}

export default TodoApp;